import { Course } from './Course';
import { Meeting } from './Meeting';

export class Group {
  id: number;
  name: string;
  description: string;
  group_courses: Course[];
  meetings: Meeting[];

  constructor(){
    this.group_courses = new Array<Course>();
    this.meetings = new Array<Meeting>();
  }
}
