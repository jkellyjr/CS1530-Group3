import { Course } from './Course';
import { Group } from './Group';
import { Meeting } from './Meeting';
import { Message } from './Message';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  bio: string;
  groups_created: Group[];
  groups: Group[];
  current_courses: Course[];
  past_courses: Course[];
  tutor_meetings: Meeting[];
  student_meetings: Meeting[];
  sent_messages: Message[];
  single_rcpt_messages: Message[];

  constructor(){
    this.groups_created = new Array<Group>();
    this.groups = new Array<Group>();
    this.current_courses = new Array<Course>();
    this.past_courses = new Array<Course>();
    this.tutor_meetings = new Array<Meeting>();
    this.student_meetings = new Array<Meeting>();
    this.sent_messages = new Array<Message>();
    this.single_rcpt_messages = new Array<Message>();
  }
}


//
// groups_created = db.relationship('Group', backref = db.backref('user', lazy = True))
// groups = db.relationship('Group', secondary = group_members, backref = db.backref('group_members', lazy = 'dynamic'))
// tutor = db.relationship('Tutor', backref = db.backref('user', lazy = True))
// user_courses = db.relationship('Course', secondary = course_users, backref = db.backref('course_users', lazy = 'dynamic'))
// meeting = db.relationship('Meeting', backref = db.backref('user', lazy = True))
