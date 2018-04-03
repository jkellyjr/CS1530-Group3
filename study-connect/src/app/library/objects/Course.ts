import { Group } from './Group';
import { User } from './User';

export class Course {
  id: number;
  name: string;
  description: string;
  subj_code: string;
  course_num: number;
  current_students: User[];
  past_students: User[];
  study_groups: Group[];

  constructor(){
    this.current_students = new Array<User>();
    this.past_students = new Array<User>();
    this.study_groups = new Array<Group>();
  }
}
