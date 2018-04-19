import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { User } from '../library/objects/index';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  // user:User;
  userSubscription:ISubscription;

 constructor(private service:UserService,
             private authService:AuthService){

 }

 ngOnInit(){
   this.userSubscription = this.authService.user.subscribe(
     user =>{
     this.service.getCourses();
     this.service.getSuggestedTutors(user.id);
     this.service.getSuggestedGroups(user.id);
     this.service.getSuggestedStudents(user.id);
   });

 }
}
