import { Component, OnInit } from '@angular/core';
import { User } from '../library/objects/index';
import { UserService } from './user.service';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {


 constructor(private service:UserService){
   service.getCourses();
   service.getTutors();
   service.getGroups();
   service.getStudents();
 }

 ngOnInit(){

 }
}
