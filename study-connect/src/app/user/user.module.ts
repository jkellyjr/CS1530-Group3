import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [

  ]
})
export class UserModule { }
