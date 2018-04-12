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
  conversation:Conversation;

  date:string;
  time:string;
  location: string;

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  requestMeeting(): void {
    let meetingRequest = new MeetingRequest(null, false, this.conversation.id, this.date+" "+this.time, this.location, 1, this.conversation.student_id, this.conversation.tutor_name);

    this.service.sendMeetingRequest(meetingRequest);
  }

}
