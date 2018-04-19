export class Meeting {
  constructor(
      public id:number,
      public accepted:boolean,
      public meeting_time: string,
      public location: string,
      public course_id: number,
      public conversation_id: number,
      public requestor_id: number,
      public requestor_role: string,
      public requestor_name: string){
  }
}
