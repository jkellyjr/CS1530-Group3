import { Group } from './Group';
import { User } from './User';

export class Message {
  id: number;
  sender: User;
  single_rcpt: User;
  group_rcpt: Group;
  sent_time: Date;
  content: string;

  constructor(){
    this.sender = new User();
    this.single_rcpt = new User();
    this.group_rcpt = new Group();
    this.sent_time = new Date();
  }
}
