import { Component, OnInit, Input } from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { Meeting, Message, User, RequestContact } from '../../../library/objects/index';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input()
  user:User;

  messages: Message[];
  messagesSubscription:ISubscription;

  constructor(private _notificationService:NotificationService) { }

  ngOnInit() {


    this.messagesSubscription = this._notificationService.messages.subscribe(
      messages => {
        this.messages = messages;
      });
  }

}
