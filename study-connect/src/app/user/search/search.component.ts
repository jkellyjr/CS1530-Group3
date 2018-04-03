import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/User';
import { Group } from '../../library/objects/Group';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()
  user: User;


  groups: Group[];
  groupsSubscription:ISubscription;

  // tutors: User[];
  // tutorssSubscription:ISubscription;
  //
  // students: User[];
  // studentssSubscription:ISubscription;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.groupsSubscription = this._userService.groups.subscribe(
      groups => {
        this.groups = groups;
        // this.dataSource = new MatTableDataSource<Group[]>(this.groups);
      });
  }

}
