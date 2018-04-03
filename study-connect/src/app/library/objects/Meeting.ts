import { Group } from './Group';
import { User } from './User';

export class Meeting {
  id: number;
  name: string;
  meeting_time: Date;
  location: string;
  group: Group;
  student: User;
  tutor: User;

  constructor(){
    this.meeting_time = new Date();
    this.group = new Group();
    this.student = new User();
    this.tutor = new User();
  }
}
