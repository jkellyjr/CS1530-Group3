import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/User';
import { Group } from '../../library/objects/Group';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user: User;
  userSubscription: ISubscription;
  groups = [{name: "1530 Exams and Quizzes", description: "Studying"}];
  dataSource = new MatTableDataSource(this.groups);
  displayedColumns = ['name', 'description', 'join'];
  

  

  constructor(private _userService: UserService) { }

  ngOnInit() {
    // this.groups[1].name = "1530 Exams and Quizzes";
    // this.groups[1].description = "Studying";
    this.userSubscription = this._userService.user.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  changeButton (e) {
    console.log("Hello");
  }

}
