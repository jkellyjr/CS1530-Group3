import { Component, OnInit, Input } from '@angular/core';

import { Group, Message, User } from '../../../../library/objects/index';

@Component({
  selector: 'conversations-table',
  templateUrl: './conversations-table.component.html',
  styleUrls: ['./conversations-table.component.css']
})
export class ConversationsTableComponent implements OnInit {
  @Input()
  messages: Message[];

  constructor() { }

  ngOnInit() {
  }

}
