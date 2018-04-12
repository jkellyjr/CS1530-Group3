import { Component, OnInit, Inject } from '@angular/core';
import { RequestContact, User } from '../../../../../library/objects/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../../../user.service';
@Component({
  selector: 'student-preview-dialog',
  templateUrl: './student-preview-dialog.component.html',
  styleUrls: ['./student-preview-dialog.component.css']
})
export class StudentPreviewDialogComponent implements OnInit {
  student:User;
  user:User;
  message: string;

  constructor(public dialogRef: MatDialogRef<StudentPreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public service: UserService) { }

  ngOnInit() {
    this.student = this.data.student;
    this.user = this.data.user;
  }

  onContactClick(): void {
    let request = new RequestContact(null, this.user.id, this.student.id, this.user.id, false, this.message, this.student.first_name+" "+this.student.last_name, this.user.first_name+" "+this.user.last_name);
    this.service.sendContactRequest(request);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
