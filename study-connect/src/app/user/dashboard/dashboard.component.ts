import { Component, OnInit } from '@angular/core';
import { Group } from '../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ISubscription } from 'rxjs/Subscription';


import { AuthService } from '../../auth/index';
import { GroupPreviewDialog } from '../group-preview-dialog/group-preview-dialog.component';
import { User } from '../../library/objects/index';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  constructor(public dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
      });
  }

  openDialog(group:Group): void{
    let dialogRef = this.dialog.open(GroupPreviewDialog, {
      width: '500px',
      data: { group: group, user:User}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
