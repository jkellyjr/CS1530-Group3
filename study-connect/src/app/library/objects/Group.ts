import { Course } from './Course';
import { Meeting } from './Meeting';
import { Conversation } from './Conversation';

export class Group {
  id: number;
  name: string;
  description: string;
  group_courses: Course[];
  meetings: Meeting[];
  conversations: Conversation[];

  constructor(){
    this.group_courses = new Array<Course>();
    this.meetings = new Array<Meeting>();
  }
}
