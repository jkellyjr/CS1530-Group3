import { Component, OnInit, Inject } from '@angular/core';
import { Group } from '../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../user.service';


@Component({
  selector: 'app-group-preview-dialog',
  templateUrl: './group-preview-dialog.component.html',
  styleUrls: ['./group-preview-dialog.component.css']
})
export class GroupPreviewDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GroupPreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UserService) { }

  ngOnInit() {
  }

  onJoinClick(): void {
    this.data.user.groups.push(this.data.group);
    this.service.updateUser(this.data.user);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
