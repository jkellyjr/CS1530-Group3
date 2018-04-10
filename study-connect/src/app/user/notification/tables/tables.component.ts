import { Component, OnInit, Input } from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { Meeting, Message, User } from '../../../library/objects/index';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input()
  user:User;

  // requests: User[];
  // requestsSubscription:ISubscription;

  // pending: User[];
  // pendingSubscription:ISubscription;

  messages: Message[];
  messagesSubscription:ISubscription;

  constructor(private _notificationService:NotificationService) { }

  ngOnInit() {

    // this.requestsSubscription = this._notificationService.requests.subscribe(
    //   requests => {
    //     this.requests = requests;
    //   });
    //
    // this.pendingSubscription = this._notificationService.pending.subscribe(
    //   pending => {
    //     this.pending = pending;
    //   });

    this.messagesSubscription = this._notificationService.messages.subscribe(
      messages => {
        this.messages = messages;
      });
  }

}
