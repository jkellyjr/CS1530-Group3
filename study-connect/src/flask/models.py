'''
--------------
--Authors:
--Evan Gutman, John Kelly
--------------

--------------
--Date Started:
--3/11/2018
--------------

-------------
--Last Modified:
--3/26/2018
-------------

-------------
--Version:
--Alpha 1.0
------------


------------
--TODO:
--put in table names
------------
'''


#SQLAlchemy models for StudyConnect application
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

'''---------------------------------- Association Tables -------------------------'''
PendingMembers = db.Table('PendingMembers',
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

'''----------------------------------- Models ------------------------------------'''
class Users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20), nullable = False)
    last_name = db.Column(db.String(20), nullable = False)
    email = db.Column(db.String(30), nullable = False)
    phone = db.Column(db.String(12), nullable = False)
    password = db.Column(db.String(300), nullable = False)
    #salt = db.Column()
    bio = db.Column(sb.String(80), nullable = True)


    user_tutor = db.Relationship('CourseTutor', backref = db.backref('user', lazy = True))
    group = db.Relationship('Groups', backref = db.backref('user', lazy = True))
    group_member = db.Relationship('GroupMembers', secondary = PendingMembers, backref = db.backref('user', lazy = True))
    message = db.Relationship('Messages', backref = db.backref('user', lazy = True)) 
    rating = db.Relationship('Ratings', backref = db.backref('user', lazy = True))
    meeting = db.Reltionship('Meetings', backref = db.backref('user', lazy = True))

    def __init__(self, first_name, last_name, email, phone, password, bio):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.password = password
        self.bio = bio

    def __repr__(self):
        return "<User {}>".format(self.first_name, self.last_name, self.email, self.email, self.phone, self.password, self.bio)


class Courses(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(80), nullable = True)
    subj_code = db.Column(db.String(10), nullable = False)
    course_num = db.Column(db.Integer, nullable = False)


    course_tutor = db.Relationship('CourseTutors', backref = db.backref('course', lazy = True))
    group = db.Relationship('Groups', backref = db.backref('course', lazy = True))


    def __init__(self, name, description, subj_code, course_name):
        self.name = name
        self.description = description
        self.subj_code = subj_code
        self.course_name = course_name
    
    def __repr__(self):
        return "<CourseInfo {}>".format(self.name, self.description, self.subj_code, self.course_num)


class CourseTutors(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable = False)
    tutor = db.Column(db.Boolean, nullable = False)
    student = db.Column(db.Boolean, nullable = False)

    def __init__(self, course_id, tutor, student)
        self.course_id = course_id
        self.tutor = turor
        self.student = student

    def __repr__(self):
        return "<CourseTutors {}>".format(self.course_id, self.tutor, self.student)


class Groups(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(80), nullable = True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable = False)
    creater = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

    group_member = db.Relationship('GroupMembers', backref = db.backref('group', lazy = True))
    message = db.Relationship('Messages', backref = db.backref('group', lazy = True))
    meeting = db.Relationship('Meetings', backref = db.backref('group', lazy = True))

    def __init__(self, name, description, course_id, creater):
        self.name = name
        self.description = description
        self.course_id = course_id
        self.creater = creater

    def __repr__(self):
        return "<Groups {}>".format(self.name, self.decription, self.course_id, self.creater)


class GroupMembers(db.Model):
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    admin = db.Column(db.Boolean, nullable = False)

    def __init__(self, group_id, user_id, admin):
        self.group_id = group_id
        self.user_id = user_id
        self.admin = admin

    def __repr__(self):
        return "<GroupMembers {}>".format(self.group_id, self.user_id, self.admin)

#can condense two options for recipt into one
class Messages(db.Model):
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    single_rcpt = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
    group_rcpt = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = True)
    sent_time = db.Column(db.DateTime, nullable = False)
    content = db.Column(db.Text, nullable = False)

    def __init__(self, sender_id, single_rcpt, group_rcpt, sent_time, content):
        self.sender_id = sender_id
        self.single_rcpt = single_rcpt
        self.group_rcpt = group_rcpt
        self.sent_time = sent_time
        self.content = content

    def __repr__(self):
        return "<Messages {}>".format(self.send_id, self.single_rcpt, self.group_rcpt, self.sent_time, self.content)

#change 2 option target rating into 1
class Ratings(db.Model):
    reviewer = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    reviewee = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    stars = db.Column(db.Integer, nullable = False)
    rate_tutor = db.Column(db.Boolean, nullable = True)
    rate_student = db.Column(db.Boolean, nullable = True)
    comments = db.Column(db.Text, nullable = True)
    rating_time = db.Column(db.DateTime, nullable = False)

    def __init__(self, reviewer, reviewee, stars, rate_tutor, rate_student, comments, rating_time):
        self.reviewer = reviewer
        self.reviewee = reviewee
        self.star = stars
        self.rate_tutor = rate_tutor
        self.rate_student = rate_student
        self.comments = comments
        self.rating_time = rating_time

    def __repr__(self):
        return "<Ratings {}>".format(self.reviwer, self.reviewee, self.stars, slef.rate_tutor, self.rate_student, self.comments, self.rating_time)
    
class Meetings(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    student = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    group = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = False)
    tutor = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    meeting_time = db.Column(db.DateTime, nullable = False)
    location = db.Column(db.String(50), nullable = True)

    def __init__(self, student, group, tutor, meeting_time, location):
        self.student = student
        self.group = group
        self.tutor = tutor
        self.meeting_time = meeting_time
        self.location = location

    def __repr__(self):
        return "<Meetings {}>".format(self.student, self.group, self.tutor, self.meeting_time, self.location)
