import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/User';
import { Group } from '../../library/objects/Group';
import { Course } from '../../library/objects/Course';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  studentOrTutor = [
    {value: 'student', viewValue: 'Currently Taking'},
    {value: 'tutor', viewValue: 'Have Taken'}
  ];

  constructor(private service:UserService) { }

  ngOnInit() {

  }
}
