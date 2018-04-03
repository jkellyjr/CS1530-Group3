export class Meeting {
  id: number;
  name: string;
  meeting_time: Date;
  location: string;

  constructor(){
    this.meeting_time = new Date();
  }
}
