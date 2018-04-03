import { Component, OnInit } from '@angular/core';
import { Group } from '../../library/objects/index';

import { ISubscription } from 'rxjs/Subscription';


import { AuthService } from '../../auth/index';
import { User } from '../../library/objects/index';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  constructor(
              private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
        console.log(JSON.stringify(this.user));
      });

  }
  logout(): void {
    this.authService.logout();
  }
}
