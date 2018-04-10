import { Component, OnInit, Input } from '@angular/core';
import { Course, Group, User } from '../../../library/objects/index';
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
  selectedCourse:number;
  searched:boolean;

  groups:Group[];
  groupsSubscription:ISubscription;

  tutors:User[];
  tutorsSubscription:ISubscription;

  students:User[];
  studentsSubscription:ISubscription;
  constructor(private service:UserService) { }

  ngOnInit() {
    this.searched = false;
    this.coursesSubscription = this.service.courses.subscribe(
      courses => {
        this.courses = courses;
      });

    this.groupsSubscription = this.service.searchGroupResult.subscribe(groups => {
      this.groups = groups;
    });

    this.tutorsSubscription = this.service.searchTutorResult.subscribe(tutors => {
      this.tutors = tutors;
    });

    this.studentsSubscription = this.service.searchStudentResult.subscribe(students => {
      this.students = students;
    });
  }

  /*
  *@param id course_id
  */
  groupSearch(): void {
    console.log("group search");
    if(this.selectedCourse != null){
      this.service.searchGroups(this.user.id, this.selectedCourse);
      this.searched = true;
    }
  }

  /*
  *@param id course_id
  */
  tutorSearch(): void {
    console.log("tutor search");

    if(this.selectedCourse !=null){
      this.service.searchTutors(this.user.id, this.selectedCourse);      this.searched = true;
    }
  }

  /*
  *@param id course_id
  */
  studentSearch(): void {
    console.log("student search");

    if(this.selectedCourse != null){
      this.service.searchStudents(this.user.id, this.selectedCourse);      this.searched = true;
    }
  }


}
