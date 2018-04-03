import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchComponent } from './search/search.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';

import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { GroupPreviewDialog } from './group-preview-dialog/group-preview-dialog.component';
import { CourseFormComponent } from './profile/course-form/course-form.component';
import { UserFormComponent } from './profile/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    SearchComponent,
    SettingsComponent,
    ProfilePreviewComponent,
    GroupPreviewDialog,
    CourseFormComponent,
    UserFormComponent
  ],
  exports: [
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    GroupPreviewDialog
  ]
})
export class UserModule { }
