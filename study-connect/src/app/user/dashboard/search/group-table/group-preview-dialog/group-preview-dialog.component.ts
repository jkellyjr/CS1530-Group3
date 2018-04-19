import { Component, OnInit, Inject } from '@angular/core';
import { Group, User, Request } from '../../../../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../../../user.service';


@Component({
  selector: 'group-preview-dialog',
  templateUrl: './group-preview-dialog.component.html',
  styleUrls: ['./group-preview-dialog.component.css']
})
export class GroupPreviewDialog implements OnInit {
  group:Group;
  user:User;
  message:string;

  constructor(
    public dialogRef: MatDialogRef<GroupPreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UserService) { }

  ngOnInit() {
    this.group = this.data.group;
    this.user = this.data.user;
  }

  onJoinClick(): void {
    let request = new Request(this.message, this.user.id, this.user.id, null, this.group.id);
    console.log(JSON.stringify(request));
    this.service.sendContactRequest(request);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
