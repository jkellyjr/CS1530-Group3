import { Component, OnInit, Input } from '@angular/core';

import { Conversation, Meeting, User } from '../../../../library/objects/index';

@Component({
  selector: 'meetings-table',
  templateUrl: './meetings-table.component.html',
  styleUrls: ['./meetings-table.component.css']
})
export class MeetingsTableComponent implements OnInit {
  @Input()
  user:User;

  meetings: any[];
  constructor() {
    this.meetings = new Array<Meeting>();
   }

  displayedColumns = ['name', 'time', 'location']
  ngOnInit() {
    this.user.student_conversations.forEach(c => {
      c.meetings.forEach(m => {
        if(m.accepted){
          this.meetings.push(m);
        }
      });
    });
    this.user.tutor_conversations.forEach(c => {
      c.meetings.forEach(m => {
        if(m.accepted){
          this.meetings.push(m);
        }
      });
    });
    this.user.groups.forEach(g => {
      g.conversations.forEach(c => {
        c.meetings.forEach(m => {
          if(m.accepted){
            this.meetings.push(m);
          }
        });
      });
    });
  }

}
