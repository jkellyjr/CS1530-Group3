import { Component, OnInit, Input } from '@angular/core';
import { Course, Group, User } from '../../library/objects/index';

@Component({
  selector: 'profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent implements OnInit {
  @Input()
  user: User;

  tempUser:User;

  constructor() {
    this.tempUser = new User();
    this.tempUser.id=0;
    this.tempUser.first_name = "first_name";
    this.tempUser.last_name = "last_name";
    this.tempUser.email = "email";
    this.tempUser.phone = "phone";
    this.tempUser.password = "password";
    this.tempUser.bio = "bio";
    this.tempUser.groups = new Array<Group>();
    this.tempUser.current_courses = new Array<Course>();
    this.tempUser.past_courses = new Array<Course>();
    this.tempUser.meetings: new Array<Meeting>();
   }

  ngOnInit() {
  }

}
