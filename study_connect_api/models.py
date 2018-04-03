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
--3/27/2018
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
# from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
import datetime
db = SQLAlchemy()
from flask_login import UserMixin

'''---------------------------------- Association Tables -------------------------'''
group_members = db.Table('group_members',
    db.Column('group_id', db.Integer, db.ForeignKey('study_group.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

course_groups = db.Table('course_groups',
    db.Column('group_id', db.Integer, db.ForeignKey('study_group.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('course.id'))
)

course_users = db.Table('course_users',
    db.Column('group_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('course_id', db.Integer, db.ForeignKey('course.id'))
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

    groups_created = db.relationship('Group', backref = db.backref('user', lazy = True))
    groups = db.relationship('Group', secondary = group_members, backref = db.backref('group_members', lazy = 'dynamic'))
    tutor = db.relationship('Tutor', backref = db.backref('user', lazy = True))
    user_courses = db.relationship('Course', secondary = course_users, backref = db.backref('course_users', lazy = 'dynamic'))
    meetings = db.relationship('Meeting', backref = db.backref('user', lazy = True))

    # message = db.relationship('Messages', backref = db.backref('user', lazy = True))
    # rating = db.relationship('Rating', backref = db.backref('user_rating', lazy = True))
    # rated = db.relationship('Rating', backref = db.backref('user_rated', lazy = True))


    def __init__(self, first_name, last_name, email, phone, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.password = password

    def __repr__(self):
        return "<User %r, %r>" % (self.first_name, self.last_name)



class Group(db.Model):
    __tablename__ = 'study_group'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(80), nullable = True)
    creator = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

    group_courses = db.relationship('Course', secondary = course_groups, backref = db.backref('course_groups', lazy = 'dynamic'))
    meetings = db.relationship('Meeting', backref = db.backref('study_group', lazy = True))
    # rating = db.relationship('Ratings', backref = db.backref('study_group_rating', lazy = True))
    # rated = db.relationship('Ratings', backref = db.backref('study_group_rated', lazy = True))

    # message = db.relationship('Message', backref = db.backref('group', lazy = True))


    def __init__(self, name, description, creator):
        self.name = name
        self.description = description
        self.creator = creator

    def __repr__(self):
        #return "<Groups {}>".format(self.name, self.decription, self.course_id, self.creater)
        return "<Groups %r, %r, %r>" % (self.name, self.description, self.creator)



class Course(db.Model):
    __tablename__ = 'course'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(80), nullable = True)
    subj_code = db.Column(db.String(10), nullable = False)
    course_num = db.Column(db.Integer, nullable = False)

    course_tutor = db.relationship('Tutor', backref = db.backref('course', lazy = True))

    def __init__(self, name, description, subj_code, course_num):
        self.name = name
        self.description = description
        self.subj_code = subj_code
        self.course_num = course_num

    def __repr__(self):
        return "<CourseInfo %r, %r, %r>" % (self.name,self.subj_code, self.course_num)


class Tutor(db.Model):
    __tablename__ = 'tutor'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable = False)

    meeting = db.relationship('Meeting', backref = db.backref('tutor', lazy = True))
    # rating = db.relationship('Ratings', backref = db.backref('tutor_rating', lazy = True))
    # rated = db.relationship('Ratings', backref = db.backref('tutor_rated', lazy = True))

    def __init__(self, course_id, user_id):
        self.course_id = course_id
        self.user_id = user_id

    def __repr__(self):
        return "<CourseTutor: %r>" % (self.user_id)




# class Message(db.Model):
#     sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
#     single_rcpt = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)
#     group_rcpt = db.Column(db.Integer, db.ForeignKey('group.id'), nullable = True)
#     sent_time = db.Column(db.DateTime, nullable = False)
#     content = db.Column(db.Text, nullable = False)
#
#     def __init__(self, sender_id, single_rcpt, group_rcpt, sent_time, content):
#         self.sender_id = sender_id
#         self.single_rcpt = single_rcpt
#         self.group_rcpt = group_rcpt
#         self.sent_time = sent_time
#         self.content = content
#
#     def __repr__(self):
#         return "<Messages {}>".format(self.send_id, self.single_rcpt, self.group_rcpt, self.sent_time, self.content)


# class Rating(db.Model):
#     __tablename__ = 'rating'
#
#     id = db.Column(db.Integer, unique = True, primary_key = True)
#     rate = db.Column(db.Integer, nullable = False)
#     comments = db.Column(db.Text, nullable = True)
#     rating_time = db.Column(db.DateTime, nullable = False)
#
#     rate_tutor = db.Column(db.Boolean, nullable = True)
#     rate_student = db.Column(db.Boolean, nullable = True)
#
#     reviewer_student_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     reviewer_group_id = db.Column(db.Integer, db.ForeignKey('study_group.id'))
#     reviewer_tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))
#
#     reviewee_student_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     reviewee_group_id = db.Column(db.Integer, db.ForeignKey('study_group.id'))
#     reviewee_tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))
#
#
#     # reviewer = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
#     # reviewee = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
#
#     def __init__(self, reviewer, reviewee, stars, rate_tutor, rate_student, comments, rating_time):
#         self.reviewer = reviewer
#         self.reviewee = reviewee
#         self.star = stars
#         self.rate_tutor = rate_tutor
#         self.rate_student = rate_student
#         self.comments = comments
#         self.rating_time = rating_time
#
#     def __repr__(self):
#         return "<Ratings {}>".format(self.reviwer, self.reviewee, self.stars, slef.rate_tutor, self.rate_student, self.comments, self.rating_time)


class Meeting(db.Model):
    __tablename__ = 'meeting'

    id = db.Column(db.Integer, unique = True, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    meeting_time = db.Column(db.DateTime, nullable = False)
    location = db.Column(db.String(50), nullable = True)

    student_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('study_group.id'))
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))

    def __init__(self, name, meeting_time, location, student, group, tutor):
        self.name = name
        self.meeting_time = meeting_time
        self.location = location
        self.student_id = student
        self.group_id = group
        self.tutor_id = tutor

    def __repr__(self):
        return "<Meetings %r >" % (self.name)
