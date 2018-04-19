import { Group } from './Group';
import { User } from './User';

export class Message {
  id: number;
  sender_id: number;
  conversation_id:number;
  content: String;

  constructor(sender_id:number, conversation_id:number, content:String){
    this.id = null;
    this.sender_id = sender_id;
    this.conversation_id = conversation_id;
    this.content = content;
  }
}
