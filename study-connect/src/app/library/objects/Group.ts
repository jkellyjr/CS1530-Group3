import { Course } from './Course';
import { Meeting } from './Meeting';

export class Group {
  id:number;
  name:string;
  description:string;
  creator:number;
  group_courses:Group[];
  meeting:Meeting;
}

//
// group_courses = db.relationship('Course', secondary = course_groups, backref = db.backref('course_groups', lazy = 'dynamic'))
// meeting = db.relationship('Meeting', backref = db.backref('study_group', lazy = True))
// # rating = db.relationship('Ratings', backref = db.backref('study_group_rating', lazy = True))
// # rated = db.relationship('Ratings', backref = db.backref('study_group_rated', lazy = True))
//
// # message = db.relationship('Message', backref = db.backref('group', lazy = True))
