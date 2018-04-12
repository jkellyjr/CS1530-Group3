import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import {MeetingRequest } from '../../../library/objects/index';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit() {
  }

  requestMeeting(): void {
    // let meetingRequest = new MeetingRequest();
  }

}
