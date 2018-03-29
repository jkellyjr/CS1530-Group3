// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';

import { LibraryModule } from '../library/library.module';
import { HomeService } from './home.service';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AboutUsComponent
  ],
  imports: [
    HomeRoutingModule,
    MatInputModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [HomeService]
})
export class HomeModule { }
