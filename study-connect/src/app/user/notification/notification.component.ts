import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/index';
import { Meeting, User } from '../../library/objects/index';

import { MessengerService} from '../messenger/messenger.service';

@Component({
  selector: 'notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  constructor(private authService: AuthService,
    private messengerService: MessengerService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
        // this.notificationService.getMeetings(user.id);
        // console.log(JSON.stringify(this.user));
      });
    this.messengerService.resetCurrentConversation();
  }

}
