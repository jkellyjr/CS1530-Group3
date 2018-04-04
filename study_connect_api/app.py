import os, sys
from flask import Flask, request, render_template, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, Group, Meeting, Course
import json, datetime


app = Flask(__name__)
CORS(app)
api = Api(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://studyconnect:studyconnect@localhost:5000/sc'
app.config.update(dict(SQLALCHEMY_DATABASE_URI="sqlite:///"+os.path.join(app.root_path, "sc.db")))
db.init_app(app)

@app.cli.command('initdb')
def initdb_command():
    """Reinitializes the database"""
    db.drop_all()
    db.create_all()
    db.session.commit()

    users = []
    users.append(User('Bob', 'Smith', 'a@gmail.com', '1111111111', '123'))
    users.append(User('Carol', 'Stevens', 'b@gmail.com', '1111111111', '123'))
    users.append(User('Anna','Martin','c@gmail.com','1111111111', '123'))
    users.append(User('Daniel','Rutgers','d@gmail.com','1111111111', '123'))
    users.append(User('Frank','Lorris','e@gmail.com','1111111111', '123'))

    for x in users:
        db.session.add(x)
    db.session.commit()

    groups = []
    groups.append(Group('CS1530 Guys', 'A bunch of dudes studying software engineering', 1))
    groups.append(Group('CS1530 Girls', 'Ladies is pimps too', 1))
    for x in groups:
        db.session.add(x)
    db.session.commit()

    users[0].groups.append(groups[0])
    users[3].groups.append(groups[0])
    users[4].groups.append(groups[0])
    users[1].groups.append(groups[1])
    users[2].groups.append(groups[1])
    db.session.commit()

    courses = []
    courses.append(Course('Software Engineering', 'Formal methods of software engineering', 'CS', 1530))
    courses.append(Course('Database Management Systems', 'Database Management Systems', 'CS', 1555))
    courses.append(Course('Web Applications', 'Web Applications', 'CS', 1520))
    courses.append(Course('Operating Systems', 'Operating Systems', 'CS', 1550))
    courses.append(Course('Interface Design Methodology', 'Interface design for mobile applications', 'CS', 1635))
    for x in courses:
        db.session.add(x)

    for x in users:
        x.current_courses.append(courses[0])
    
    groups[0].group_courses.append(courses[0])
    groups[1].group_courses.append(courses[0])

    
    db.session.commit()

get_user_parser = reqparse.RequestParser()
get_user_parser.add_argument('id')

post_user_parser = reqparse.RequestParser()
post_user_parser.add_argument('first_name' )
post_user_parser.add_argument('last_name' )
post_user_parser.add_argument('email' )
post_user_parser.add_argument('phone' )
post_user_parser.add_argument('password' )

put_user_parser = reqparse.RequestParser()
put_user_parser.add_argument('id')
put_user_parser.add_argument('first_name')
put_user_parser.add_argument('last_name')
put_user_parser.add_argument('email')
put_user_parser.add_argument('password')
put_user_parser.add_argument('phone')
put_user_parser.add_argument('bio')
put_user_parser.add_argument('groups', action='append')
put_user_parser.add_argument('current_courses', action='append')
put_user_parser.add_argument('past_courses', action='append')

class UserAPI(Resource):

    def get(self):
        args = get_user_parser.parse_args()
        if args['id'] is None:
            users = []
            temp = User.query.all()
            for u in temp:
                users.append(u.serialize())
            return users
        temp = User.query.filter_by(id = args['id']).first()

        if temp is None:
            return 404
        return temp.serialize()

    def put(self):
        args = put_user_parser.parse_args()
        if args['id'] is not None:
            temp = User.query.filter_by(id = args['id']).first()

            if temp is None:
                return 404

            # Update User
            temp.first_name = args['first_name']
            temp.last_name = args['last_name']
            temp.email = args['email']
            temp.phone = args['phone']
            temp.bio = args['bio']

            if args['groups'] is not None and len(args['groups']) > 1:
                temp.groups = []
                for x in args['groups']:
                    y = json.loads(x.replace("'",'"'))
                    temp.groups.append(Group.query.filter_by(id = y['id']).first())

            if args['current_courses'] is not None and len(args['current_courses']) > 1:
                temp.current_courses = []
                for x in args['current_courses']:
                    y = json.loads(x.replace("'",'"'))
                    temp.current_courses.append(Course.query.filter_by(id = y['id']).first())

            if args['past_courses'] is not None and len(args['past_courses']) > 1:
                temp.past_courses = []
                for x in args['past_courses']:
                    y = json.loads(x.replace("'",'"'))
                    temp.past_courses.append(Course.query.filter_by(id = y['id']).first())
            
            if args['password'] is not None:
                temp.set_password(args['password'])

            db.session.commit();

            return temp.serialize();

        return 400

    def post(self):
        args = post_user_parser.parse_args()
        
        # Registration
        db.session.add(User(first_name=args['first_name'], last_name=args['last_name'], email=args['email'], phone=args['phone'], password=args['password']))
        db.session.commit()

        temp = User.query.filter_by(email = args['email']).first()
        return temp.serialize()
        

login_parser = reqparse.RequestParser()
login_parser.add_argument('email')
login_parser.add_argument('password')

class LoginAPI(Resource):
    def post(self):
        args = login_parser.parse_args();
        print(args)
        temp = User.query.filter_by(email = args['email']).first()

        if temp is None or not temp.check_password(args['password']):
            return 404
        
        return temp.serialize()

get_group_parser = reqparse.RequestParser()
get_group_parser.add_argument('id')

post_group_parser = reqparse.RequestParser()
post_group_parser.add_argument('name' )

class GroupAPI(Resource):

    def get(self):
        args = get_group_parser.parse_args()
        if args['id'] is None:
            groups = []
            temp = Group.query.all()
            for x in temp:
                groups.append(x.serialize())
            return groups
        temp = Group.query.filter_by(id = args['id']).first()

        if temp is None:
            return 404
        return temp.serialize()

    def post(self, group_id):
        args = post_group_parser.parse_args()
        data = json.loads(args['gonads'])

        new_group = Group(data['name'], data['description'], data['creater'])
        db.session.add(new_group)
        db.session.commit()
        return 201

suggested_groups_parser = reqparse.RequestParser()
suggested_groups_parser.add_argument('user_id')

class SuggestedGroupsAPI(Resource):
    def get(self):
        args = suggested_groups_parser.parse_args()
        if args['user_id'] is None:
            return 400
        u = User.query.filter_by(id = args['user_id']).first()
        if u is None:
            return 404
        groups = Group.query.all()
        sug_groups = []
        for x in groups:
            sug = False
            if x not in u.groups:
                for y in u.current_courses:
                    if y in x.group_courses:
                        sug = True
            if sug:
                sug_groups.append(x.serialize())
        return sug_groups

suggested_tutors_parser = reqparse.RequestParser()
suggested_tutors_parser.add_argument('user_id')

class SuggestedTutorsAPI(Resource):
    def get(self):
        args = suggested_tutors_parser.parse_args()
        if args['user_id'] is None:
            return 400
        u = User.query.filter_by(id = args['user_id']).first()
        if u is None:
            return 404
        users = User.query.all()
        sug_tutors = []
        for x in users:
            sug = False
            if x not in u.tutors:
                for y in u.current_courses:
                    if y in x.past_courses:
                        sug = True
            if sug:
                sug_tutors.append(x.serialize())
        return sug_tutors

suggested_students_parser = reqparse.RequestParser()
suggested_students_parser.add_argument('user_id')

class SuggestedStudentsAPI(Resource):
    def get(self):
        args = suggested_students_parser.parse_args()
        if args['user_id'] is None:
            return 400
        u = User.query.filter_by(id = args['user_id']).first()
        if u is None:
            return 404
        users = User.query.all()
        sug_students = []
        for x in users:
            sug = False
            if x not in u.students:
                for y in u.past_courses:
                    if y in x.current_courses:
                        sug = True
            if sug:
                sug_students.append(x.serialize())
        return sug_students


class MeetingAPI(Resource):
    def get(self):
        meetings = []
        temp = Meeting.query.filter_by(id = meeting_id).first()

        meetings.append({'id' : temp.id, 'name' : temp.name, 'meeting_time' : temp.meeting_time, 'location' : temp.location, 'student_id' : temp.user.id, 'group_id' : temp.study_group.id, 'tutor_id' : temp.tutor.id})

        return jsonify({'meetings' : meetings})

    def post(self, meeting_id):
        args = parser.parse_args()
        data = json.loads(args['gonads'])

        new_meeting = Meeting(data['name'], data['meeting_time'], data['location'], data['student_id'], data['group_id'], data['tutor_id'])

        db.session.add(new_meeting)
        db.session.commit()
        return 201

    def delete(self, meeting_id):
        temp = Meeting.query.filter_by(id = meeting_id).first()
        db.session.delete(temp)
        db.session.commit()
        return 200

get_course_parser = reqparse.RequestParser()
get_course_parser.add_argument('id')

class CourseAPI(Resource):

    def get(self):
        args = get_course_parser.parse_args()
        if args['id'] is None:
            courses = []
            temp = Course.query.all()
            for x in temp:
                courses.append(x.serialize())
            return courses
        temp = Course.query.filter_by(id = args['id']).first()

        if temp is None:
            return 404
        return temp.serialize()


    # def post(self, course_id):
    #     args = parser.parse_args()
    #     data = json.loads(args['gonads'])

    #     new_course = Course(data['name'], data['description'], data['subj_code'], data['course_num'])

    #     db.session.add(new_course)
    #     db.session.commit()
    #     return 201

    # def delete(self, course_id):
    #     temp = Meeting.query.filter_by(id = course_id).first()
    #     db.session.delete(temp)
    #     db.session.commit()
    #     return 200

# class rating(Resource):
#     def get(self, rating_id):

#     def post(self, rating_id):

#     def delete(self, rating_id):

# class message(Resource):
#     def get(self, message_id):

#     def post(self, message_id):

#     def delete(self, message_id):


api.add_resource(UserAPI, '/api/user/')
api.add_resource(LoginAPI, '/api/login/')
api.add_resource(GroupAPI, '/api/group/')
api.add_resource(SuggestedGroupsAPI, '/api/group/suggested/')
api.add_resource(SuggestedTutorsAPI, '/api/tutor/suggested/')
api.add_resource(SuggestedStudentsAPI, '/api/student/suggested/')
api.add_resource(MeetingAPI, '/api/meeting/')
api.add_resource(CourseAPI, '/api/course/')
# api.add_resource(rating, '/rating/<rating_id>')
# api.add_resource(message, '/message/<message_id>')
# api.add_resource(RegisterAPI, '/api/register')

app.secret_key = "hail2pitt"

if __name__ == "__main__":
	app.run(host="0.0.0.0", debug = True, threaded=True)
