import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course } from './objects/Course';
import { Group } from './objects/Group';
import { Meeting } from './objects/Meeting';
import { Message } from './objects/Message';
import { User } from './objects/User';

//basically all declarations should be exports of this module
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Course,
    Group,
    Meeting,
    Message,
    User
  ],
  exports: [
    Course,
    Group,
    Meeting,
    Message,
    User
  ],
  providers: [

  ]
})
export class LibraryModule { }
