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

  oldPass: string;
  newPass: string;
  duplicatePass: string;

  tempUser:User;
  constructor(private service:UserService) {
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

  updateUser(): void{

    if(this.oldPass != "" && this.oldPass == this.tempUser.password){ //user entered a password so verify
        if(this.newPass != "" && this.newPass == this.duplicatePass){
          this.tempUser.password = this.newPass;

          this.user = this.service.updateUser(this.user);
        } else {
          console.log("New password and re-type must match");
        }
    } else {
      console.log("Old password is incorrect")
    }


  }
}
