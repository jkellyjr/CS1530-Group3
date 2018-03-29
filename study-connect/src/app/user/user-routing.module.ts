import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'search', component: SearchComponent },
          { path: 'settings', component: SettingsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
