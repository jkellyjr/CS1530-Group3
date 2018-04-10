import { Component, OnInit, Input } from '@angular/core';
import { Course, User } from '../../../library/objects/index';
import { UserService } from '../../user.service';
import { ISubscription } from 'rxjs/Subscription';


@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Input()
  user:User;

  courses: Course[];
  coursesSubscription:ISubscription;

  options = [
    {value: 0, viewValue: 'Groups'},
    {value: 1, viewValue: 'Tutors'},
    {value: 2, viewValue: 'Students'}
  ];

  option = 0;
  selectedCourse:Course;

  constructor(private service:UserService) { }

  ngOnInit() {
    this.coursesSubscription = this.service.courses.subscribe(
      courses => {
        this.courses = courses;
        // this.selectedCourse = this.courses[0];
      });
  }

  /*
  *@param id course_id
  */
  groupSearch(): void {
    console.log("search group");
    if(this.selectedCourse != null){
      console.log("selected course not null");
      this.service.searchGroups(this.user.id, this.selectedCourse.id);
    }
  }

  /*
  *@param id course_id
  */
  tutorSearch(): void {
    if(this.selectedCourse !=null){
      this.service.searchTutors(this.user.id, this.selectedCourse.id);
    }
  }

  /*
  *@param id course_id
  */
  studentSearch(): void {
    if(this.selectedCourse != null){
      this.service.searchStudents(this.user.id, this.selectedCourse.id);
    }
  }


}
