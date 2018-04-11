import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Group, User } from '../../../../library/objects/index';
import { StudentPreviewDialogComponent } from './student-preview-dialog/student-preview-dialog.component';

@Component({
  selector: 'student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  @Input()
  students:User[];

  @Input()
  user:User;

  displayedColumns = ['name', 'bio', 'contact'];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDialog(student:User, user:User): void {
    let dialogRef = this.dialog.open(StudentPreviewDialogComponent, {
      width: '500px',
      data: { student: student, user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
