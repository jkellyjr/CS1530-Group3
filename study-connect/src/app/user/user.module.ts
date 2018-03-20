import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [

  ]
})
export class UserModule { }
