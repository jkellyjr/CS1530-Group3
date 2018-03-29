import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';


import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    SearchComponent,
    SettingsComponent,
    ProfilePreviewComponent
  ],
  exports: [
  ],
  providers: [

  ]
})
export class UserModule { }
