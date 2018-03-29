import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = false;
  user: User;
  userSubscription: ISubscription;

  email:string;
  password:string;
  first_name:string;
  last_name:string;
  phone:string;

  constructor(private _homeService: HomeService) {

   }

  ngOnInit() {
    this.email = "";
    this.password="";
    this.first_name="";
    this.last_name="";
    this.phone="";
  }

  login() {
    this.user.email = this.email;
    this.user.password = this.password;
    this._homeService.login(this.user);
  }

  register() {
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.first_name = this.first_name;
    this.user.last_name = this.last_name;
    this.user.phone = this.phone;
    this._homeService.register(this.user);
  }
}
