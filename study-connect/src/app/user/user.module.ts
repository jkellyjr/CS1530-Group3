import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [

  ]
})
export class UserModule { }
