import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomeService } from '../home.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = false;
  loginGroup: FormGroup;
  firstRegisterGroup: FormGroup;
  secondRegisterGroup: FormGroup;
  thirdRegisterGroup: FormGroup;
  user: User;
  userSubscription: ISubscription;

  constructor(private _formBuilder: FormBuilder, private _homeService: HomeService) { }

  ngOnInit() {
    this.userSubscription = this._homeService.user.subscribe(
      user => {
        this.user = user;
      }
    );
    this.loginGroup = this._formBuilder.group({
      loginCtrl: ['', Validators.required]
    })
    this.firstRegisterGroup = this._formBuilder.group({
      firstRegisterCtrl: ['', Validators.required]
    });
    this.secondRegisterGroup = this._formBuilder.group({
      secondRegisterCtrl: ['', Validators.required]
    });
    this.thirdRegisterGroup = this._formBuilder.group({
      thirdRegisterCtrl: ['', Validators.required]
    });
  }

}
