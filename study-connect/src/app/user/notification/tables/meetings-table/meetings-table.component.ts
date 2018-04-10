import { Component, OnInit, Input } from '@angular/core';

import { Meeting, User } from '../../../../library/objects/index';

@Component({
  selector: 'meetings-table',
  templateUrl: './meetings-table.component.html',
  styleUrls: ['./meetings-table.component.css']
})
export class MeetingsTableComponent implements OnInit {
  @Input()
  user:User;

  constructor() { }

  ngOnInit() {
  }

}
