import { Message } from './index';
export class Conversation {
  id: number;
  student_id: number;
  student_name:string;
  tutor_id: number;
  tutor_name:string;
  group_id: number;
  group_name: string;
  messages: Message[];

  constructor(){
    this.messages = [];
  }
}
