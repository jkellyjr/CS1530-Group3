'''
Product: StudyConnect
Description: SQLAlchemy Models
Authors: Evan Gutman & John Kelly
Version: Alpha 1.0
'''

from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]

def serialize_many(many):
    ret = []
    for x in many:
        ret.append(x.serialize())
    return ret


'''---------------------------------- Association Tables -------------------------'''
group_members = db.Table('group_members',
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

course_groups = db.Table('course_groups',
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('course.id'))
)

course_tutors = db.Table('course_tutors',
    db.Column('course_id', db.Integer, db.ForeignKey('course.id')),
    db.Column('tutor_id', db.Integer, db.ForeignKey('user.id'))
)

course_students = db.Table('course_students',
    db.Column('course_id', db.Integer, db.ForeignKey('course.id')),
    db.Column('student_id', db.Integer, db.ForeignKey('user.id'))
)

tutors_and_students = db.Table('tutors_and_students',
    db.Column('tutor_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('student_id', db.Integer, db.ForeignKey('user.id'))
)


'''----------------------------------- Models ------------------------------------'''
class User(db.Model, UserMixin):
    __tablename__ = 'user'

    id = db.Column(db.Integer, unique= True, primary_key = True)
    first_name = db.Column(db.String(20), nullable = False)
    last_name = db.Column(db.String(20), nullable = False)
    email = db.Column(db.String(30), nullable = False)
    phone = db.Column(db.String(12), nullable = False)
    password = db.Column(db.String(300), nullable = False)
    bio = db.Column(db.String(80), nullable = True)

    groups_created = db.relationship('Group', backref = "creator")
    groups = db.relationship('Group', secondary = group_members, backref = db.backref('members', lazy = 'dynamic'))
    current_courses = db.relationship('Course', secondary = course_students, backref = db.backref('current_students', lazy = 'dynamic'))
    past_courses = db.relationship('Course', secondary = course_tutors, backref = db.backref('past_students', lazy = 'dynamic'))
    tutors = db.relationship('User', secondary = tutors_and_students, primaryjoin = "User.id == tutors_and_students.c.student_id", secondaryjoin = "User.id == tutors_and_students.c.tutor_id", backref = db.backref('students', lazy = 'dynamic'))

    tutor_conversations = db.relationship('Conversation', primaryjoin='User.id == Conversation.tutor_id', backref='tutor', lazy='dynamic')
    student_conversations = db.relationship('Conversation', primaryjoin='User.id == Conversation.student_id', backref='student', lazy='dynamic')

    tutor_contact_requests = db.relationship('ContactRequest', primaryjoin='User.id == ContactRequest.tutor_id', backref='tutor', lazy='dynamic')
    student_contact_requests = db.relationship('ContactRequest', primaryjoin='User.id == ContactRequest.student_id', backref='student', lazy='dynamic')

    tutor_meetings = db.relationship('Meeting', primaryjoin='User.id == Meeting.tutor_id', backref='tutor', lazy='dynamic')
    student_meetings = db.relationship('Meeting', primaryjoin='User.id == Meeting.student_id', backref='student', lazy='dynamic')

    sent_messages = db.relationship('Message', back_populates = 'sender')

    def serialize(self):
        combined_meetings = list(self.tutor_meetings)
        combined_meetings.extend(self.student_meetings)
        return {
            "id":self.id,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "email":self.email,
            "phone":self.phone,
            "bio":self.bio,
            "groups":serialize_many(self.groups),
            "current_courses":serialize_many(self.current_courses),
            "past_courses":serialize_many(self.past_courses),
            "tutor_conversations": serialize_many(self.tutor_conversations),
            "student_conversations": serialize_many(self.student_conversations),
            "tutor_contact_requests": serialize_many(self.tutor_contact_requests),
            "student_contact_requests": serialize_many(self.student_contact_requests),
            "meetings": serialize_many(combined_meetings)
        }

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __init__(self, first_name, last_name, email, phone, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.set_password(password)

    def __repr__(self):
        return "<User %r, %r>" % (self.first_name, self.last_name)


class Group(db.Model):
    __tablename__ = 'group'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(80), nullable = True)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

    group_courses = db.relationship('Course', secondary = course_groups, backref = db.backref('study_groups', lazy = 'dynamic'))
    meetings = db.relationship('Meeting', backref = db.backref('Group', lazy = True))
    conversations = db.relationship('Conversation', back_populates='group')

    contact_requests = db.relationship('ContactRequest', primaryjoin='Group.id == ContactRequest.group_id', backref='group', lazy='dynamic')

    meetings = db.relationship('Meeting', primaryjoin='Group.id == Meeting.group_id', backref='group', lazy='dynamic')


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "group_courses": serialize_many(self.group_courses),
            "meetings": serialize_many(self.meetings),
            "conversations": serialize_many(self.conversations),
            "contact_requests": serialize_many(self.contact_requests)
        }

    def __init__(self, name, description, creator_id):
        self.name = name
        self.description = description
        self.creator_id = creator_id

    def __repr__(self):
        return "<Groups %r, %r, %r>" % (self.name, self.description, self.creator)


class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(80), nullable = True)
    subj_code = db.Column(db.String(10), nullable = False)
    course_num = db.Column(db.Integer, nullable = False)

    meeting = db.relationship('Meeting', backref = db.backref('Course', lazy = True))

    def serialize(self):
        return {
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "subj_code":self.subj_code,
            "course_num":self.course_num
        }

    def __init__(self, name, description, subj_code, course_num):
        self.name = name
        self.description = description
        self.subj_code = subj_code
        self.course_num = course_num

    def __repr__(self):
        return "<CourseInfo %r, %r, %r>" % (self.name,self.subj_code, self.course_num)


class Meeting(db.Model):
    __tablename__ = 'meeting'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    accepted = db.Column(db.Boolean, default = False)
    meeting_time = db.Column(db.String(100), nullable = False)
    location = db.Column(db.String(100), nullable = True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'))

    # Request
    requestor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
    group_requestor_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = True)

    # Requested
    tutor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = True)


    def serialize(self):
        map = {
            "id": self.id,
            "accepted": self.accepted,
            "meeting_time": self.meeting_time,
            "location":self.location,
            "course_id": self.course_id,
            "conversaton_id": self.conversation_id
        }

        if self.group_requestor_id == None:
            map["requestor_id"] = self.requestor_id
            if self.requestor_id == self.conversation.student_id:
                map["requestor_role"] = "student"
                map["requestor_name"] = self.conversation.student.first_name + " " + self.conversation.student.last_name
            else:
                map["requestor_role"] = "tutor"
                map["requestor_name"] = self.conversation.tutor.first_name + " " + self.conversation.tutor.last_name
        else:
            map["requestor_id"] = self.group_requestor_id
            map["requestor_role"] = "group"
            map["requestor_name"] = self.conversation.group.name

        return map

    def __init__(self, meeting_time, location, course_id, conversation_id, requestor_id, group_requestor_id):
        self.meeting_time = meeting_time
        self.location = location
        self.course_id = course_id
        self.conversation_id = conversation_id
        self.requestor_id = requestor_id
        self.group_requestor_id = group_requestor_id


    def __repr__(self):
        return "<Meetings %r >" % (self.course_id)


class Conversation(db.Model):
    __tablename__ = 'conversation'

    id = db.Column(db.Integer, primary_key = True, unique = True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
    tutor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)

    messages = db.relationship('Message', backref = db.backref('Conversation', lazy = True))

    meetings = db.relationship('Meeting', primaryjoin='Conversation.id == Meeting.conversation_id', backref='conversation', lazy='dynamic')

    group = db.relationship('Group', back_populates='conversations')

    def serialize(self):
        map = { "id": self.id }

        if self.group_id == None:
            map["student_id"] = self.student_id
            map["student_name"] = self.student.first_name + " " + self.student.last_name
            map["tutor_id"] = self.tutor_id
            map["tutor_name"] = self.tutor.first_name + " " + self.tutor.last_name
        elif self.student_id == None:
            map["tutor_id"] = self.tutor_id
            map["tutor_name"] = self.tutor.first_name + " " + self.tutor.last_name
            map["group_id"] = self.group_id
            map["group_name"] = self.group.name
        else:
            map["student_id"] = self.student_id
            map["student_name"] = self.student.first_name + " " + self.student.last_name
            map["group_id"] = self.group_id
            map["group_name"] = self.group.name

        map["messages"] = serialize_many(self.messages)
        map["meetings"] = serialize_many(self.meetings)

        return map

    def __init__(self, group_id, tutor_id, student_id):
        self.group_id = group_id
        self.student_id = student_id
        self.tutor_id = tutor_id

    def __repr__(self):
        return '<Conversation %r>' % (self.id)


class Message(db.Model):
    __tablename__ = 'message'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    sent_time = db.Column(db.DateTime, nullable = False)
    content = db.Column(db.Text, nullable = False)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)

    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'))
    sender = db.relationship('User', back_populates='sent_messages')

    def serialize(self):
        return {
            "id": self.id,
            'sent_time':dump_datetime(self.sent_time),
            "sender_id": self.sender_id,
            "sender_name": self.sender.first_name + " " + self.sender.last_name,
            "content": self.content
        }

    def __init__(self, sender_id, sent_time, content, conversation_id):
        self.sender_id = sender_id
        self.sent_time = sent_time
        self.content = content
        self.conversation_id = conversation_id

    def __repr__(self):
        return "<Messages {}>".format(self.send_id, self.single_rcpt_id, self.group_rcpt_id, self.sent_time, self.content)


class ContactRequest(db.Model):
    __tablename__ = 'contact_request'

    id = db.Column(db.Integer, primary_key = True, unique = True)
    message = db.Column(db.String(100), nullable = False)
    accepted = db.Column(db.Boolean, default = False)
    requestor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    tutor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = True)

    def serialize(self):
        map = {
            "id": self.id,
            "accepted": self.accepted,
            "message": self.message,
            "requestor_id": self.requestor_id
        }

        if self.requestor_id == self.student_id:
            map["requestor_role"] = "student"
            map["requestor_name"] = self.student.first_name + " " + self.student.last_name
            if self.tutor_id == None:
                map["requested_role"] = "group"
                map["requested_id"] = self.group_id
                map["requested_name"] = self.group.name
            else:
                map["requested_role"] = "tutor"
                map["requested_id"] = self.tutor_id
                map["requested_name"] = self.tutor.first_name + " " + self.tutor.last_name
        elif self.requestor_id == self.tutor_id:
            map["requestor_role"] = "tutor"
            map["requestor_name"] = self.tutor.first_name + " " + self.tutor.last_name
            if self.student_id == None:
                map["requested_role"] = "group"
                map["requested_id"] = self.group_id
                map["requested_name"] = self.group.name
            else:
                map["requestor_role"] = "student"
                map["requested_id"] = self.student_id
                map["requestor_name"] = self.student.first_name + " " + self.student.last_name
        else:
            if self.student_id == None:
                map["requested_role"] = "tutor"
                map["requested_id"] = self.tutor_id
                map["requested_name"] = self.tutor.first_name + " " + self.tutor.last_name
            else:
                map["requestor_role"] = "student"
                map["requested_id"] = self.student_id
                map["requestor_name"] = self.student.first_name + " " + self.student.last_name


        return map

    def __init__(self, message, requestor_id, student_id, tutor_id, group_id):
        self.message = message
        self.requestor_id = requestor_id
        self.student_id = student_id
        self.tutor_id = tutor_id
        self.group_id = group_id

    def __repr__(self):
        return '<ContactRequest %r, %r>' % (self.requestor_id, self.message)
