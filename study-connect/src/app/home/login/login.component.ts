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
  loggedIn: User;
  userSubscription: ISubscription;

  loggedSubscription: ISubscription;
  isLogged: Boolean;

  temp:string;

  constructor(public authService: AuthService,
              private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
    this.loggedSubscription = this.authService.logged.subscribe(
      logged => {

        console.log("Is logged changed");
        this.isLogged = logged;

        // let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : "/user/dashboard";
        // console.log(logged);
        // console.log(redirect);
        if (logged) {
          this.router.navigate(["/user"]);
        }
        
      }
    )
  }

  login() {
    console.log("login");
    this.authService.login(this.user).subscribe(() => {
          console.log(this.authService.isLoggedIn);
          if (true) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default

            // let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user';
            // console.log(redirect);
            // // Redirect the user
            // this.router.navigate(["/user"]);
          }
        });
  }

  register() {
    console.log("register");
    this.authService.register(this.user).subscribe(() => {
          if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/user/profile';

            // Redirect the user
            this.router.navigate([redirect]);
          }
        });
  }
}
