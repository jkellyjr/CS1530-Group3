import { Component, OnInit, Input } from '@angular/core';
import { Course, Group, Meeting, User } from '../../library/objects/index';

@Component({
  selector: 'profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent implements OnInit {
  @Input()
  user: User;

  // tempUser:User;

  constructor() { }

  ngOnInit() {
  }

}
