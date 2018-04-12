import { Course } from './Course';
import { Group } from './Group';
import { Meeting } from './Meeting';
import { Message } from './Message';
import { RequestContact } from './RequestContact';
import { Conversation } from './Conversation';

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
  // meetings: Meeting[];

  tutor_conversations: Conversation[];
  student_conversations: Conversation[];

  tutor_contact_requests: RequestContact[];
  student_contact_requests: RequestContact[];

  constructor(){
    this.groups = new Array<Group>();
    this.current_courses = new Array<Course>();
    this.past_courses = new Array<Course>();
    // this.meetings = new Array<Meeting>();

    this.tutor_conversations = new Array<Conversation>();
    this.student_conversations = new Array<Conversation>();

    this.tutor_contact_requests = new Array<RequestContact>();
    this.student_contact_requests = new Array<RequestContact>();
  }
}
