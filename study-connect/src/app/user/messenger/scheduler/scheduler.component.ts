import { Component, OnInit,Input } from '@angular/core';

import { UserService } from '../../user.service';
import { Conversation, Meeting } from '../../../library/objects/index';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  @Input()
  conversation:Conversation;

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
    let meetingRequest = new Meeting(null, false, this.conversation.id, +this.year+"/"+this.month+"/"+this.day+" "+this.time, this.location, 1);

    this.service.sendMeetingRequest(meetingRequest);
  }

}
