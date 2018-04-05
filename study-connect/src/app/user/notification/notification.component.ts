import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/index';
import { Meeting, User } from '../../library/objects/index';


@Component({
  selector: 'notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
          this.user = user;
      })
  }

}
