import { Component, OnInit, Input } from '@angular/core';

import { Group, Message, User, Conversation } from '../../../../library/objects/index';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

import { MessengerService } from '../../../messenger/messenger.service';

@Component({
  selector: 'conversations-table',
  templateUrl: './conversations-table.component.html',
  styleUrls: ['./conversations-table.component.css']
})
export class ConversationsTableComponent implements OnInit {
  @Input()
  user: User;

  con_source: Conversation[] = [];
  displayedColumns: String[] = ["name", "openConvo"];

  constructor(private mesService:MessengerService) { }

  ngOnInit() {
    this.user.student_conversations.forEach(c => {
      this.con_source.push(c);
    });
    this.user.tutor_conversations.forEach(c => {
      this.con_source.push(c);
    });
    this.user.groups.forEach(g => {
      g.conversations.forEach(c => {
        this.con_source.push(c);
      });
    });
  }

  openConversation(c:Conversation):void {
    this.mesService.setCurrentConversation(c);
    return;
  }
}
