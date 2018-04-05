import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/index';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  logged:Boolean;
  loggedSubscription: ISubscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedSubscription = this.authService.logged.subscribe(
      logged => {
          this.logged = logged;
      })
  }

}
