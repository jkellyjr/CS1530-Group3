
export class MeetingRequest{
  id: number;
  conversation_id: number;
  date: Date;
  location: string;
  course_id: number;

  constructor(){
    this.date = new Date();
  }
}
