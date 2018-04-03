import { Course } from './Course';
import { Group } from './Group';
import { Meeting } from './Meeting';

export class User {
  id:number;
  first_name:string;
  last_name:string;
  email:string;
  phone:string;
  password:string;
  bio:string;
  groups_created:Group[];
  groups:Group[];

  user_courses:Course[];
  meeting:Meeting[];

  constructor(){
    this.groups_created = new Array<Group>();
    this.groups = new Array<Group>();
    this.user_courses = new Array<Course>();
    this.meeting = new Array<Meeting>();
  }
}


//
// groups_created = db.relationship('Group', backref = db.backref('user', lazy = True))
// groups = db.relationship('Group', secondary = group_members, backref = db.backref('group_members', lazy = 'dynamic'))
// tutor = db.relationship('Tutor', backref = db.backref('user', lazy = True))
// user_courses = db.relationship('Course', secondary = course_users, backref = db.backref('course_users', lazy = 'dynamic'))
// meeting = db.relationship('Meeting', backref = db.backref('user', lazy = True))
