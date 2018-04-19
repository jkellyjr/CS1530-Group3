import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../user/user.service';

import { User, GroupCreate } from '../library/objects/index';

@Component({
  selector: 'app-group-create-dialog',
  templateUrl: './group-create-dialog.component.html',
  styleUrls: ['./group-create-dialog.component.css']
})
export class GroupCreateDialogComponent implements OnInit {
  user:User;

  groupName:string;
  desc:string;

  constructor(public dialogRef:MatDialogRef<GroupCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public service: UserService) {
              }

  ngOnInit() {
    this.user = this.data.user;
  }

  createGroup():void {
    let group = new GroupCreate(this.groupName, this.desc, this.user.id);
    console.log(JSON.stringify(group));
    this.service.createGroup(group);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
