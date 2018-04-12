import { Component, OnInit, Input } from '@angular/core';

import { Group, Message, User, Conversation } from '../../../../library/objects/index';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'messages-table',
  templateUrl: './conversations-table.component.html',
  styleUrls: ['./conversations-table.component.css']
})
export class ConversationsTableComponent implements OnInit {
  @Input()
  User: User;
  con_source: Conversation[];

  constructor() { }

  ngOnInit() {
    this.User.student_conversations.forEach(c => {
      this.con_source.push(c);
    });
    this.User.tutor_conversations.forEach(c => {
      this.con_source.push(c);
    });
    this.User.groups.forEach(g => {
      g.conversations.forEach(c => {
        this.con_source.push(c);
      });
    });
  }
}