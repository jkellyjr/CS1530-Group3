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

  courses: Course[];
  courseSubscription: ISubscription;

  user: User;
  userSubscription:ISubscription;

  coursesOffered = [
    {value: 'CS1530', viewValue: 'CS1530'},
    {value: 'CS1550', viewValue: 'CS1550'},
    {value: 'CS1555', viewValue: 'CS1555'}
  ];

  studentOrTutor = [
    {value: 'student', viewValue: 'Currently Taking'},
    {value: 'tutor', viewValue: 'Have Taken'}
  ];

  constructor(private service:UserService) { }

  ngOnInit() {
    this.courseSubscription = this.service.courses.subscribe(
      courses => {
        this.courses = courses;
      });

      this.userSubscription = this.service.user.subscribe(
        user => {
          this.user = user;
        });
    this.service.getCourses();
  }

  addCourse(course:Course): void {
    this.user.user_courses.push(course);
  }



}