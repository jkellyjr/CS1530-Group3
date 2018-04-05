import { Component, OnInit, Inject } from '@angular/core';
import { Group, User } from '../../../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../../user.service';


@Component({
  selector: 'group-preview-dialog',
  templateUrl: './group-preview-dialog.component.html',
  styleUrls: ['./group-preview-dialog.component.css']
})
export class GroupPreviewDialog implements OnInit {
  group:Group;
  user:User;

  constructor(
    public dialogRef: MatDialogRef<GroupPreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UserService) {
      // this.user = new User();
     }

  ngOnInit() {
    this.group = this.data.group;
    this.user = this.data.user;
  }

  onJoinClick(): void {
    this.user.groups.push(this.group);
    this.service.updateUser(this.user);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
