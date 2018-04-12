
export class MeetingRequest{
  constructor(
    public id:number,
    public conversation_id: number,
    public date: Date,
    public location: string,
    public course_id: number
  ){
    this.date = new Date();
  }
}
