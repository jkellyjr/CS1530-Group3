import { Message } from './index';
export class Conversation {
  id: number;
  student_id: number;
  tutor_id: number;
  group_id: number;
  messages: Message[];

  constructor(){
    this.messages = [];
  }
}
