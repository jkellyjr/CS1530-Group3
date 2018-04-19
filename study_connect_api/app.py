import os, sys
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from flask_cors import CORS
from models import db, User, Group, Meeting, Course, Conversation, Message, ContactRequest
import json, datetime


app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:5000/sc'
#app.config.update(dict(SQLALCHEMY_DATABASE_URI="sqlite:///"+os.path.join(app.root_path, "sc.db")))
db.init_app(app)

'''---------------------------------- DB Configuration -------------------------'''
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
    groups.append(Group('Go Eagles', 'Phily > PIttsburgh', users[3].id))
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

    users.append(User('John','Doe','f@gmail.com','1111111111', '123'))
    users[5].past_courses.append(courses[0])
    db.session.add(users[5])

    groups[0].group_courses.append(courses[0])
    groups[1].group_courses.append(courses[0])

    db.session.commit()

    convos = []
    # group_id, tutor_id, student_id
    convos.append(Conversation(None, users[2].id, users[3].id))
    convos.append(Conversation(groups[0].id, None, users[3].id))
    convos.append(Conversation(groups[1].id, None, users[1].id))
    convos.append(Conversation(None, users[1].id, users[0].id))

    for x in convos:
        db.session.add(x)

    db.session.commit()

    messages = []
    messages.append(Message(users[2].id,  datetime.datetime.now(), "What time would be good to meet?", convos[0].id))
    messages.append(Message(users[3].id, datetime.datetime.now(), "Never dumbass LOL", convos[0].id))

    messages.append(Message(users[1].id,  datetime.datetime.now(), "Shalom, looks like a prety cool group", convos[1].id))
    messages.append(Message(groups[0].id, datetime.datetime.now(), "Yeah I know were pretty sick", convos[1].id))

    messages.append(Message(groups[0].id, datetime.datetime.now(), "I don't know how to do problem number 3 from quiz 1", convos[1].id))
    messages.append(Message(groups[0].id, datetime.datetime.now(), "Can anyone help me?", convos[1].id))

    for x in messages:
        db.session.add(x)
    db.session.commit()

    meeting_reqs = []
    meeting_reqs.append(Meeting(str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M")), "Cathy", courses[2].id, convos[1].id, users[3].id, None))
    meeting_reqs.append(Meeting(str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M")), "Benny", courses[2].id, convos[1].id, None, groups[0].id))
    meeting_reqs.append(Meeting(str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M")), "Hillman", courses[0].id, convos[0].id, users[1].id, None))
    meeting_reqs.append(Meeting(str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M")), "Market", courses[1].id, convos[2].id, users[1].id, None))

    for x in meeting_reqs:
        db.session.add(x)
    db.session.commit()

    contact_req = []
    contact_req.append(ContactRequest("Yo yo yo, add me dawg", users[0].id, users[0].id, None, groups[1].id))
    contact_req.append(ContactRequest("Hiyah I need a tutor", users[2].id, users[2].id, users[3].id, None))

    for x in contact_req:
        db.session.add(x)
    db.session.commit()




'''---------------------------------- User API -------------------------'''
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
            temp = User.query.all()
            return [user.serialize() for user in temp]
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

        db.session.add(User(first_name=args['first_name'], last_name=args['last_name'], email=args['email'], phone=args['phone'], password=args['password']))
        db.session.commit()

        temp = User.query.filter_by(email = args['email']).first()
        return temp.serialize()


'''---------------------------------- Login API -------------------------'''
login_parser = reqparse.RequestParser()
login_parser.add_argument('email')
login_parser.add_argument('password')

class LoginAPI(Resource):
    def post(self):
        args = login_parser.parse_args();
        temp = User.query.filter_by(email = args['email']).first()

        if temp is None or not temp.check_password(args['password']):
            return 404

        return temp.serialize()


'''---------------------------------- Group API -------------------------'''
get_group_parser = reqparse.RequestParser()
get_group_parser.add_argument('id')

post_group_parser = reqparse.RequestParser()
post_group_parser.add_argument('name')
post_group_parser.add_argument('description')
post_group_parser.add_argument('creator_id')

class GroupAPI(Resource):

    def get(self):
        args = get_group_parser.parse_args()

        if args['id'] is None:
            temp = Group.query.all()
            return [group.serialize() for group in temp]

        temp = Group.query.filter_by(id = args['id']).first()

        if temp is None:
            return 404
        return temp.serialize()

    def post(self):
        args = post_group_parser.parse_args()
        group = Group(name = args['name'], description = args['description'], creator_id = args['creator_id'])
        if group == None:
            return 401
        db.session.add(group)
        db.session.commit()
        return 201


'''---------------------------------- Search API -------------------------'''
search_parser = reqparse.RequestParser()
search_parser.add_argument('user_id')
search_parser.add_argument('search_type')
search_parser.add_argument('course_id')

class SearchAPI(Resource):
    def get(self):
        args = search_parser.parse_args()
        u = User.query.filter_by(id = args['user_id']).first()
        c = Course.query.filter_by(id = args['course_id']).first()
        results = []
        if u is None or c is None:
            return 404
        if args['search_type'] == 'group':
            for g in c.study_groups:
                if g not in u.groups:
                    results.append(g.serialize())

        elif args['search_type'] == 'tutor':
            for s in c.past_students:
                if s not in u.tutors and s != u:
                    results.append(s.serialize())

        elif args['search_type'] == 'student':
            if c not in u.past_courses:
                return 400
            for s in c.current_students:
                if s not in u.students and s != u:
                    results.append(s.serialize())

        else:
            return 400

        return results



'''---------------------------------- Course API -------------------------'''
get_course_parser = reqparse.RequestParser()
get_course_parser.add_argument('id')

post_course_parser = reqparse.RequestParser()
post_course_parser.add_argument('name')

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


'''---------------------------------- Conversation API -------------------------'''
get_conversation_parser = reqparse.RequestParser()
get_conversation_parser.add_argument('id')

post_conversation_parser = reqparse.RequestParser()
post_conversation_parser.add_argument('group_id')
post_conversation_parser.add_argument('tutor_id')
post_conversation_parser.add_argument('student_id')

class ConversationAPI(Resource):

    def get(self):
        args = get_conversation_parser.parse_args()
        if args['id'] is None:
            convos = []
            temp = Conversation.query.all()
            for x in temp:
                convos.append(x.serialize())
            return convos
        temp = Conversation.query.filter_by(id = args['id']).first()

        if temp is None:
            return 404
        return temp.serialize()

    def post(self):
        args = post_conversation_parser.parse_args()
        convo = Conversation(group_id = args["group_id"], tutor_id = args["tutor_id"], student_id = args["student_id"])
        if convo == None:
            return 401
        db.session.add(convo)
        db.session.commit()
        return 201


'''---------------------------------- Message API -------------------------'''
post_message_parser = reqparse.RequestParser()
post_message_parser.add_argument('conversation_id')
post_message_parser.add_argument('content')
post_message_parser.add_argument('sender_id')

class MessageAPI(Resource):

    def post(self):
        args = post_message_parser.parse_args()
        mes = Message(sender_id = args['sender_id'], sent_time = datetime.datetime.now(), content = args['content'], conversation_id = args['conversation_id'])
        if mes is None:
            return 401
        db.session.add(mes)
        db.session.commit()
        return 201


'''------------------------------- Scheduling API ---------------------------------'''
get_sched_parser = reqparse.RequestParser()
get_sched_parser.add_argument('conversation_id')
get_sched_parser.add_argument('user_id')
get_sched_parser.add_argument('group_id')
get_sched_parser.add_argument('accepted')

put_sched_parser = reqparse.RequestParser()
put_sched_parser.add_argument('id')
put_sched_parser.add_argument('accepted')
put_sched_parser.add_argument('meeting_time')
put_sched_parser.add_argument('location')
put_sched_parser.add_argument('course_id')
put_sched_parser.add_argument('conversaton_id')
put_sched_parser.add_argument('requestor_id')
put_sched_parser.add_argument('group_requestor_id')
put_sched_parser.add_argument('tutor_id')
put_sched_parser.add_argument('student_id')
put_sched_parser.add_argument('group_id')

post_sched_parser = reqparse.RequestParser()
post_sched_parser.add_argument('conversation_id')
post_sched_parser.add_argument('meeting_time')
post_sched_parser.add_argument('location')
post_sched_parser.add_argument('course_id')
post_sched_parser.add_argument('requestor_id')
post_sched_parser.add_argument('group_requestor_id')

class ScheduleAPI(Resource):

    def get(self):
        args = get_sched_parser.parse_args()

        if args['accepted'] is None:
            return 400
        else:
            accepted = True
            if args['accepted'].lower() == 'false':
                accepted = False

        if args['conversation_id'] is not None:
            temp = Meeting.query.filter_by(conversation_id = args['conversation_id'], accepted = accepted).all()
            if temp is None:
                return 404
            return [meeting.serialize() for meeting in temp]

        elif args['group_id'] is not None:
            temp = Meeting.query.filter_by(group_id = args['group_id'], accepted = accepted).all()
            if temp is None:
                return 404
            return [meeting.serialize() for meeting in temp]

        elif args['user_id'] is not None:
            tmp = Meeting.query.filter_by(student_id = args['user_id'], accepted = accepted).all()
            tmp2 = Meeting.query.filter_by(tutor_id = args['user_id'], accepted = accepted).all()

            if tmp is None or tmp2 is None:
                return 404

            print("tmp: " + str(tmp))
            student = [meeting.serialize() for meeting in tmp]
            tutor = [meeting.serialize() for meeting in tmp2]

            return student + tutor

        else:
            return 401

    def put(self):
        args = put_sched_parser.parse_args()

        if args['id'] is not None:
            meeting = Meeting.query.filter_by(id = args['id']).first()
            if meeting is None:
                return 404

            accepted = False
            if args['accepted'].lower() == "true":
                accepted = True

            meeting.accepted = accepted
            meeting.meeting_time = args['meeting_time']
            meeting.location = args['location']
            meeting.course_id = args['course_id']
            meeting.conversaton_id = args['conversaton_id']
            meeting.requestor_id = args['requestor_id']
            meeting.group_requestor_id = args['group_requestor_id']
            meeting.tutor_id = args['tutor_id']
            meeting.student_id = args['student_id']
            meeting.group_id = args['group_id']

            db.session.add(meeting)
            db.session.commit()
            return 205

    def post(self):
        args = post_sched_parser.parse_args()

        meeting = Meeting(meeting_time = args['meeting_time'], location = args['location'], course_id = args['course_id'], conversation_id = args['conversation_id'], requestor_id = args['requestor_id'], group_requestor_id = args['group_requestor_id'])
        if meeting == None:
            return 401

        convo = Conversation.query.filter_by(id = args['conversation_id']).first()
        if convo == None:
            return 401

        if convo.group_id == None:
            if convo.student_id == int(args["requestor_id"]):
                meeting.tutor_id = convo.tutor_id
            else:
                meeting.student_id = convo.student_id
        elif convo.student_id == None:
            if convo.tutor_id == int(args["requestor_id"]):
                meeting.group_id = convo.group_id
            else:
                meeting.tutor_id = convo.tutor_id
        else:
            if convo.student_id == int(args["requestor_id"]):
                meeting.group_id = convo.group_id
            else:
                meeting.student_id = convo.student_id


        db.session.add(meeting)
        db.session.commit()
        return 201


'''---------------------------------- Contact Request API -------------------------'''
get_contact_req_parser = reqparse.RequestParser()
get_contact_req_parser.add_argument('group_id')
get_contact_req_parser.add_argument('user_id')
get_contact_req_parser.add_argument('accepted')

put_contact_req_parser = reqparse.RequestParser()
put_contact_req_parser.add_argument('id')
put_contact_req_parser.add_argument('accepted')
put_contact_req_parser.add_argument('message')
put_contact_req_parser.add_argument('requestor_id')
put_contact_req_parser.add_argument('student_id')
put_contact_req_parser.add_argument('tutor_id')
put_contact_req_parser.add_argument('group_id')

post_contact_req_parser = reqparse.RequestParser()
post_contact_req_parser.add_argument('requestor_id')
post_contact_req_parser.add_argument('student_id')
post_contact_req_parser.add_argument('tutor_id')
post_contact_req_parser.add_argument('group_id')



class ContactRequestAPI(Resource):

    def get(self):
        args = get_contact_req_parser.parse_args()

        if args['accepted'] is None:
            return 400
        else:
            accepted = True
            if args['accepted'].lower() == 'false':
                accepted = False

        if args['user_id'] is not None:
            temp = ContactRequest.query.filter_by(student_id = args['user_id'], accepted = accepted).all()
            temp2 = ContactRequest.query.filter_by(tutor_id= args['user_id'], accepted = accepted).all()

            if temp is None or temp2 is None:
                return 404

            reqs = [req.serialize() for req in temp]
            reqs2 = [req.serialize() for req in temp2]
            return reqs + reqs2

        elif args['group_id'] is not None:
            temp = ContactRequest.query.filter_by(group_id = args['group_id'], accepted = accepted).all()

            if temp is None:
                return 404

            return [group.serialize() for group in temp]

        else:
            return 401


    def put(self):
        args = put_contact_req_parser.parse_args()

        if args['id'] is not None:
            req = ContactRequest.query.filter_by(id = args['id']).first()

            if req is None:
                return 401

            accepted = False
            if args['accepted'].lower() == "true":
                accepted = True

            req.accepted = accepted
            req.message = args['message']
            req.requestor_id = args['requestor_id']
            req.student_id = args['student_id']
            req.tutor_id = args['tutor_id']
            req.group_id = args['group_id']

            db.session.add(req)
            db.session.commit()
            return 205


    def post(self):
        args = post_contact_req_parser.parse_args()

        req = ContactRequest(message = args["message"], requestor_id = args["requestor_id"], student_id = args['student_id'], tutor_id = args['tutor_id'],  group_id = args['group_id'])

        if req == None:
            return 401

        db.session.add(req)
        db.session.commit()
        return 201


'''---------------------------------- Suggested Groups API -------------------------'''
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


'''---------------------------------- Suggested Tutor API -------------------------'''
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


'''---------------------------------- Suggested Student API -------------------------'''
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


'''---------------------------------- Endpoints -------------------------'''
api.add_resource(UserAPI, '/api/user/')
api.add_resource(LoginAPI, '/api/login/')
api.add_resource(GroupAPI, '/api/group/')
api.add_resource(CourseAPI, '/api/course/')
api.add_resource(ConversationAPI, '/api/conversation/')
api.add_resource(MessageAPI, '/api/message/')
api.add_resource(ContactRequestAPI, '/api/request/contact/')
api.add_resource(ScheduleAPI, '/api/schedule/')
api.add_resource(SuggestedGroupsAPI, '/api/group/suggested/')
api.add_resource(SuggestedTutorsAPI, '/api/tutor/suggested/')
api.add_resource(SuggestedStudentsAPI, '/api/student/suggested/')
api.add_resource(SearchAPI, '/api/search/')



app.secret_key = "hail2pitt"

if __name__ == "__main__":
	app.run(host="0.0.0.0", debug = True, threaded=True)
