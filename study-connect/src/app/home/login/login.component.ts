import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';

import { AuthService } from '../../auth/index';
import { User } from '../../library/objects/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = false;
  user: User;



  logAttempt: boolean;
  regAttempt: boolean;
  // userSubscription: ISubscription;
  loggedSubscription: ISubscription;

  temp:string;

  constructor(public authService: AuthService,
              private router: Router) {
    this.user = new User();
    this.logAttempt = false;
    this.regAttempt = false;
   }

  ngOnInit() {
    this.loggedSubscription = this.authService.logged.subscribe(
      logged => {
        console.log("Logged changed");
        if(logged){
          console.log("logged is true");
          let redirect = "";
          if(this.logAttempt){
            console.log("login attempt");
            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user';
            this.logAttempt = false;
          } else if(this.regAttempt) {
            console.log("register attempt");
            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user/profile';
            this.regAttempt = false;
          }
          console.log("redirecting to: "+redirect);
          this.router.navigate([redirect]);
        }
      });
  }

  login() {
    console.log("login");
    this.authService.login(this.user).subscribe(() => {
          this.logAttempt = true; //set flag so when response comes, it will redirect
        });
  }

  register() {
    console.log("register");
    this.authService.register(this.user).subscribe(() => {
          this.regAttempt = true;
        });
  }
}
