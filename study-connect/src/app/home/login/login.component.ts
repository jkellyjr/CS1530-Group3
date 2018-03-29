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

  constructor(private _homeService: HomeService) {
   }

  ngOnInit() {
    
  }

}
