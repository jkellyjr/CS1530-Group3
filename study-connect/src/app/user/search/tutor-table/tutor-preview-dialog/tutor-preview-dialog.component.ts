import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../../user.service';

@Component({
  selector: 'tutor-preview-dialog',
  templateUrl: './tutor-preview-dialog.component.html',
  styleUrls: ['./tutor-preview-dialog.component.css']
})
export class TutorPreviewDialogComponent implements OnInit {
  tutor:User;
  user:User;

  constructor(public dialogRef: MatDialogRef<TutorPreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public service: UserService) { }

  ngOnInit() {
    this.tutor = this.data.tutor;
    this.user = this.data.user;
  }

  onContactClick(): void {
    //open messages with the tutor
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
