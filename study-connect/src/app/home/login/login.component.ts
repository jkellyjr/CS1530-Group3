import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/User';
import {Router} from '@angular/router';

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

  temp:string;

  constructor(private _homeService: HomeService,
              private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
    this._homeService.userObservable.subscribe(
      user => {
        this.loggedIn = user;
      });
  }

  login() {

  }

  register() {
    this._homeService.register(this.user);
    if(this.loggedIn.id > 0){
      this.router.navigateByUrl("user/profile");
    }
  }
}
