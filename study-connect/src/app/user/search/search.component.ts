import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../library/objects/User';
import { Group } from '../../library/objects/Group';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GroupPreviewDialog } from '../group-preview-dialog/group-preview-dialog.component';

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

  dataSource: MatTableDataSource;
  displayedColumns = ['name', 'description', 'join'];


  constructor(private _userService: UserService,
              public dialog: MatDialog) {
                this.group = new Group();
               }

  ngOnInit() {
    this.groupsSubscription = this._userService.groups.subscribe(
      groups => {
        this.groups = groups;
        this.dataSource = new MatTableDataSource(this.groups);
      });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(GroupPreviewDialog, {
      width: '500px',
      data: { group: this.group, user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
