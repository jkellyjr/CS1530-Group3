import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  fourthRegisterGroup: FormGroup;
  fifthRegisterGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
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
