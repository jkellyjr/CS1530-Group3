import { Course } from './Course';
import { Meeting } from './Meeting';
import { Message } from './Message';
import { User } from './User';

export class Group {
  id: number;
  name: string;
  description: string;
  group_courses: Course[];
  group_members: User[];
  meetings: Meeting[];
  group_rcpt_messages: Message[];

  constructor(){
    this.group_courses = new Array<Course>();
    this.group_members = new Array<User>();
    this.meetings = new Array<Meeting>();
    this.group_rcpt_messages = new Array<Message>();
  }
}
