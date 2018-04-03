import { Component, OnInit, Input } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { UserService } from '../../user.service';
import { Course,Group, User } from '../../../library/objects/index';

@Component({
  selector: 'course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})

export class CourseFormComponent implements OnInit {
  @Input()
  user:User;

  selectedCourse: Course;
  time: number;

  courses: Course[];
  courseSubscription: ISubscription;

  constructor(private service:UserService) {
    this.selectedCourse = new Course();
  }

  ngOnInit() {
    this.courseSubscription = this.service.courses.subscribe(
      courses => {
        this.courses = courses;
      });
    this.service.getCourses();
  }

  addCourse(): void {
    console.log("Course name: "+this.selectedCourse.name+". Time: "+this.time);
    if(this.time == 0){ //0 for current_courses
      this.user.current_courses.push(this.selectedCourse);
    } else {
      this.user.past_courses.push(this.selectedCourse);
    }
    this.user = this.service.updateUser(this.user);
  }

}
