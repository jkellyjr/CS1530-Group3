import { Component, OnInit,Input } from '@angular/core';

import { UserService } from '../../user.service';
import { Conversation, MeetingRequest } from '../../../library/objects/index';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  @Input()
  conversation_id:number;

  date:string;
  time:string;
  location: string;

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  requestMeeting(): void {
    let meetingRequest = new MeetingRequest(null, this.conversation_id, this.date+" "+this.time, this.location, null);

    this.service.sendMeetingRequest(meetingRequest);
  }

}
