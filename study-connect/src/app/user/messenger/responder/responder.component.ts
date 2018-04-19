import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../../user.service';
import { Conversation, Meeting, User } from '../../../library/objects/index';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {
  @Input()
  conversation:Conversation;

  @Input()
  user:User;

  constructor(private service:UserService) { }

  ngOnInit() {
  }

  acceptMeeting(meeting:Meeting) {
    meeting.accepted = true;
    this.service.respondMeetingRequest(meeting);
  }

  declineMeeting(meeting:Meeting) {
    this.service.respondMeetingRequest(meeting);
  }
}
