import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { AuthService } from '../../auth/auth.service';
import { ISubscription } from 'rxjs/Subscription';
import { Course, Group, Meeting, User } from '../../library/objects/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  tempCurrent: Course[];
  tempPast: Course[];
  constructor(private service:UserService,
              private authService:AuthService, private router:Router) {
                this.tempCurrent = new Array<Course>();
                this.tempPast = new Array<Course>();
              }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
        for(let i=0;i<user.current_courses.length;i++){
          this.tempCurrent.push(user.current_courses[i]);
        }
        for(let j=0;j<user.past_courses.length;j++){
          this.tempPast.push(user.past_courses[j]);
        }
      });
  }

  updateUser(): void{
    this.user.current_courses = this.tempCurrent;
    this.user.past_courses = this.tempPast;
    this.user = this.service.updateUser(this.user);
    this.router.navigate(["/user"]);
  }

  moveToPast(course:Course):void {
    let index = this.tempCurrent.indexOf(course);
    this.tempPast.push(this.tempCurrent[index]);
    this.tempCurrent.splice(index,1);
  }

  moveToCurrent(course:Course):void {
    let index = this.tempPast.indexOf(course);
    this.tempCurrent.push(this.tempPast[index]);
    this.tempPast.splice(index,1);
  }
}
