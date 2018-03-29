import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
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
  loginForm: FormGroup;
  regForm1: FormGroup;
  regForm2: FormGroup;
  regForm3: FormGroup;
  user: User;
  userSubscription: ISubscription;

  constructor(private _formBuilder: FormBuilder, private _homeService: HomeService) {
   }

  ngOnInit() {
    this.userSubscription = this._homeService.user.subscribe(
      user => {
        this.user = user;
      }
    );
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.regForm1 = this._formBuilder.group({
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.regForm2 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.regForm3 = this._formBuilder.group({
      password: ['', Validators.required]
    });
  }

}
