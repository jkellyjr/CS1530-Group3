import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';


import { AuthService } from '../../auth/index';
import { UserService } from '../user.service';
import { Group, User } from '../../library/objects/index';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  groups:Group[];
  groupsSubscription:ISubscription;

  tutors:User[];
  tutorsSubscription:ISubscription;

  students:User[];
  studentsSubscription:ISubscription;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
        console.log(JSON.stringify(this.user));
      });
    this.groupsSubscription = this.userService.searchGroupResult.subscribe(groups => {
      this.groups = groups;
    });

    this.tutorsSubscription = this.userService.searchTutorResult.subscribe(tutors => {
      this.tutors = tutors;
    });

    this.studentsSubscription = this.userService.searchStudentResult.subscribe(students => {
      this.students = students;
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
