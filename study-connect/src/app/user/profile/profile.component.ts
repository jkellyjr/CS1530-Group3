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

  oldPass: string;
  newPass: string;
  duplicatePass: string;

  constructor(private service:UserService,
              private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
      });
  }

  updateUser(): void{

    if(this.oldPass != "" && this.oldPass == this.user.password){ //user entered a password so verify
        if(this.newPass != "" && this.newPass == this.duplicatePass){
          this.user.password = this.newPass;

          this.user = this.service.updateUser(this.user);
        } else {
          console.log("New password and re-type must match");
        }
    } else {
      console.log("Old password is incorrect")
    }
    this.router.navigate(["/user"]);

  }
}
