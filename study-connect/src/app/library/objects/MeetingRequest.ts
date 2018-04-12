
export class MeetingRequest{
  constructor(
    public id:number,
    public conversation_id: number,
    public date: string,
    public location: string,
    public course_id: number
  ){  }
}
