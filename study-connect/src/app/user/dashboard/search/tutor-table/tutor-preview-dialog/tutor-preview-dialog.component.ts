import { Component, OnInit, Inject } from '@angular/core';
import { RequestContact, User } from '../../../../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../../../user.service';

@Component({
  selector: 'tutor-preview-dialog',
  templateUrl: './tutor-preview-dialog.component.html',
  styleUrls: ['./tutor-preview-dialog.component.css']
})
export class TutorPreviewDialogComponent implements OnInit {
  tutor:User;
  user:User;
  message: string;

  constructor(public dialogRef: MatDialogRef<TutorPreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public service: UserService) { }

  ngOnInit() {
    this.tutor = this.data.tutor;
    this.user = this.data.user;
  }

  onContactClick(): void {
    let request = new RequestContact(null, this.tutor.id, this.user.id, this.user.id, false, this.message, this.tutor.first_name+" "+this.tutor.last_name, this.user.first_name+" "+this.user.last_name);
    this.service.sendContactRequest(request);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}