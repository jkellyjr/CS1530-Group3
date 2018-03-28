import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule { }
