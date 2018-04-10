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
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { GroupPreviewDialog } from './search/group-table/group-preview-dialog/group-preview-dialog.component';
import { CourseFormComponent } from './profile/course-form/course-form.component';
import { UserFormComponent } from './profile/user-form/user-form.component';
import { GroupTableComponent } from './search/group-table/group-table.component';
import { TutorTableComponent } from './search/tutor-table/tutor-table.component';
import { StudentTableComponent } from './search/student-table/student-table.component';
import { StudentPreviewDialogComponent } from './search/student-table/student-preview-dialog/student-preview-dialog.component';
import { TutorPreviewDialogComponent } from './search/tutor-table/tutor-preview-dialog/tutor-preview-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { TablesComponent } from './notification/tables/tables.component';
import { NotificationService } from './notification/notification.service';
import { MeetingsTableComponent } from './notification/tables/meetings-table/meetings-table.component';
import { RequestsTableComponent } from './notification/tables/requests-table/requests-table.component';
import { PendingTableComponent } from './notification/tables/pending-table/pending-table.component';
import { MessagesTableComponent } from './notification/tables/messages-table/messages-table.component';
import { SearchFormComponent } from './search/search-form/search-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
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
    UserFormComponent,
    GroupTableComponent,
    TutorTableComponent,
    StudentTableComponent,
    StudentPreviewDialogComponent,
    TutorPreviewDialogComponent,
    NotificationComponent,
    TablesComponent,
    MeetingsTableComponent,
    RequestsTableComponent,
    PendingTableComponent,
    MessagesTableComponent,
    SearchFormComponent
  ],
  exports: [
  ],
  providers: [
    NotificationService,
    UserService
  ],
  entryComponents: [
    GroupPreviewDialog
  ]
})
export class UserModule { }
