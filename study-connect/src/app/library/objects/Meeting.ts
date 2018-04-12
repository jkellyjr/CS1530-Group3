export class Meeting {
  constructor(
      public id:number,
      public approved:boolean,
      public conversation_id: number,
      public meeting_date: string,
      public location: string,
      public course_id: number){
  }
}
