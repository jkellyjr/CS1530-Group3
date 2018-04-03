import os
from flask import Flask, request, render_template, jsonify
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Group, Meeting, Course
import json, datetime


app = Flask(__name__)
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

    user1 = User('Bob', 'Smith', 'a@gmail.com', '1111111111', generate_password_hash('123'))
    user2 = User('Carol', 'Stevens', 'b@gmail.com', '1111111111', generate_password_hash('123'))
    user3 = User('Anna','Martin','c@gmail.com','1111111111', generate_password_hash('123'))
    user4 = User('Daniel','Rutgers','d@gmail.com','1111111111', generate_password_hash('123'))
    user5 = User('Frank','Lorris','e@gmail.com','1111111111', generate_password_hash('123'))

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.commit()

    group1 = Group('tits', 'fuck bitches get money', user1.id)
    group2 = Group('five0', 'fun fun fun', user1.id)
    db.session.add(group1)
    db.session.add(group2)
    db.session.commit()

    user2.groups.append(group1)
    user5.groups.append(group1)
    db.session.add(user2)
    db.session.add(user5)
    db.session.commit()

    course1 = Course('course 1', 'this class sucks', 'CS', 1530)
    db.session.add(course1)
    db.session.commit()

    # tutor1 =  Tutor(course1.id, user2.id)
    # db.session.add(tutor1)
    # db.session.commit()

    # group1.group_courses.append(course1)
    # db.session.add(group1)
    # db.session.commit()

    # meeting1 = Meeting( 'shalom', datetime.datetime.now(), 'yo bitches house', user1.id, None, tutor1.id)
    # db.session.add(meeting1)
    # db.session.commit()

get_user_parser = reqparse.RequestParser()
get_user_parser.add_argument('id')

post_user_parser = reqparse.RequestParser()
post_user_parser.add_argument('first_name', location='form')
post_user_parser.add_argument('last_name', location='form')
post_user_parser.add_argument('email', location='form')
post_user_parser.add_argument('phone', location='form')
post_user_parser.add_argument('password', location='form')

put_user_parser = reqparse.RequestParser()
put_user_parser.add_argument('id', location='form')
put_user_parser.add_argument('first_name', location='form')
put_user_parser.add_argument('last_name', location='form')
put_user_parser.add_argument('email', location='form')
put_user_parser.add_argument('phone', location='form')
put_user_parser.add_argument('bio', location='form')

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

            db.session.commit();

            return temp.serialize();

        return 400

    def post(self):
        args = post_user_parser.parse_args()
        salted_pass = generate_password_hash(args['password'])
        
        # Registration
        db.session.add(User(first_name=args['first_name'], last_name=args['last_name'], email=args['email'], phone=args['phone'], password=salted_pass))
        db.session.commit()

        temp = User.query.filter_by(email = args['email']).first()
        return temp.serialize()
        

login_parser = reqparse.RequestParser()
login_parser.add_argument('email', location='form')
login_parser.add_argument('password', location='form')

class LoginAPI(Resource):
    def post(self):
        args = login_parser.parse_args();
        temp = User.query.filter_by(email = args['email']).first()

        if temp is None or not check_password_hash(temp.password, args['password']):
            return 404
        
        return temp.serialize()

get_group_parser = reqparse.RequestParser()
get_group_parser.add_argument('id')

post_group_parser = reqparse.RequestParser()
post_group_parser.add_argument('name', location='form')
post_group_parser.add_argument('name', location='form')

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


class MeetingAPI(Resource):
    def get(self, meeting_id):
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


class CourseAPI(Resource):

    def get(self, course_id):
        temp = Course.query.filter_by(id = course_id).first()

        tutorList = [{'id': tutor.id, 'name': tutor.user_id} for tutor in temp.course_tutors]
        groupList = [{'id': group.id, 'name': group.name} for group in temp.course_groups]

        course = {
            'id' : temp.id,
            'name' : temp.name,
            'description' : temp.description,
            'subj_code' : temp.subj_code,
            'course_num' : temp.course_num,
            'tutor_list': tutorList,
            'group_list': groupList
        }

        return course


    def post(self, course_id):
        args = parser.parse_args()
        data = json.loads(args['gonads'])

        new_course = Course(data['name'], data['description'], data['subj_code'], data['course_num'])

        db.session.add(new_course)
        db.session.commit()
        return 201

    def delete(self, course_id):
        temp = Meeting.query.filter_by(id = course_id).first()
        db.session.delete(temp)
        db.session.commit()
        return 200


class TutorAPI(Resource):

    def get(self, tutor_id):
        temp = Tutor.query.filter_by(id = tutor_id).first()
        user = User.query.filter_by(id = temp.user.id).first()
        course = Course.query.filter_by(id = temp.course_id).first()

        meetingList = [{'id': meeting.id, 'name': meeting.name} for meeting in temp.meetings]

        tut = {
            'user_id' : temp.user.id,
            'user_first_name': user.first_name,
            'user_last_name': user.last_name
        }

        course = {
            'course_id' : temp.course.id,
            'course_name': course.name
        }

        tutor = {
            'id' : temp.id,
            'user': tut,
            'course': course,
            'meeting_list': meetingList
        }

        return tutor

    def post(self, tutor_id):
        args = parser.parse_args()
        data = json.loads(args['gonads'])

        new_tutor = Tutor(data['user_id'], data['course_id'])

        db.session.add(new_tutor)
        db.session.commit()
        return 201

    def delete(self, tutor_id):
        temp = Tutor.query.filter_by(id = tutor_id).first()
        db.session.delete(temp)
        db.session.commit()
        return 200




class RegisterAPI(Resource):

    def post(self):
        user = User.query.filter_by(email = request.form['email']).first()
        if user is not None:
            return 401
        else:
            temp = User(request.form['first_name'], request.form['last_name'], request.form['email'], request.form['phone'], request.form['password'], request.form['bio'])
 
        print(temp)

        db.session.add(temp)
        db.session.commit()

        final_user = {'id' : temp.id, 'first_name' : temp.first_name, 'last_name' : temp.last_name, 'email': temp.email, 'phone' : temp.phone, 'bio' : temp.bio}



        #user = User.query.filter
        return final_user
    
    
    
    
'''    
    def post(self):
        
        args = parser.parse_args()
        data = json.loads(args['gonads'])


        data = json.loads(args)
        print(data)
        
        user = User.query.filter_by(email = data['email']).first()

        if user is None:
            return 401
        elif not check_password_hash(user.password, data['password']):
            return 401
        else:
            users = []
            users.append({'id' : user.id})
            return jsonify({'users' : users})



class rating(Resource):
    def get(self, rating_id):

    def post(self, rating_id):

    def delete(self, rating_id):

class message(Resource):
    def get(self, message_id):

    def post(self, message_id):

    def delete(self, message_id):

'''


api.add_resource(UserAPI, '/api/user/')
api.add_resource(LoginAPI, '/api/login/')
api.add_resource(GroupAPI, '/api/group/')
api.add_resource(MeetingAPI, '/api/meeting/')
api.add_resource(CourseAPI, '/api/course/')
'''
api.add_resource(rating, '/rating/<rating_id>')
api.add_resource(message, '/message/<message_id>')
'''
api.add_resource(RegisterAPI, '/api/register')




'''
@app.route('/', methods=['GET'])
def home():
    group = Group.query.all()
    # mems = group.group_courses
    # course = Course.query.filter_by(id = mems).first()
    # users = User.query.filter().all()
    return render_template('base.html', title = 'Groups', list = group, list2 = group)
'''
