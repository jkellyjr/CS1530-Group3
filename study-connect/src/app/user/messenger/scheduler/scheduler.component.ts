import { Component, OnInit,Input } from '@angular/core';

import { UserService } from '../../user.service';
import { Conversation, Meeting, User } from '../../../library/objects/index';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  @Input()
  conversation:Conversation;

  @Input()
  user:User;

  date:Date;
  time:Date;
  location: string;

  month:string;
  day:string;
  year:string;

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  requestMeeting(): void {
    let role = "";
    if(this.conversation.tutor_id == this.user.id){
      role = "tutor";
    }else {
      role = "student";
    }
    let meetingRequest = new Meeting(null, false, this.month+"/"+this.day+"/"+this.year+" "+this.time, this.location, 1,this.conversation.id, this.user.id, role ,this.user.first_name+" "+this.user.last_name);
    this.service.sendMeetingRequest(meetingRequest);
  }

}
