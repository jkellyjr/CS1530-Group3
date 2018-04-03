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
  groups: Group[];
  current_courses: Course[];
  past_courses: Course[];
  meetings: Meeting[];

  constructor(){
    this.groups = new Array<Group>();
    this.current_courses = new Array<Course>();
    this.past_courses = new Array<Course>();
    this.meetings = new Array<Meeting>();
  }
}
