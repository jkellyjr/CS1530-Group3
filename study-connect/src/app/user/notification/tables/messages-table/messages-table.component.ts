import { Component, OnInit, Input } from '@angular/core';

import { Group, Message, User } from '../../../../library/objects/index';

@Component({
  selector: 'messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.css']
})
export class MessagesTableComponent implements OnInit {
  @Input()
  messages: Message[];

  constructor() { }

  ngOnInit() {
  }

}
