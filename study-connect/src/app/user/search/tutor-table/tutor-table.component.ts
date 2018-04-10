import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Group, User } from '../../../library/objects/index';
import { TutorPreviewDialogComponent } from './tutor-preview-dialog/tutor-preview-dialog.component';

@Component({
  selector: 'tutor-table',
  templateUrl: './tutor-table.component.html',
  styleUrls: ['./tutor-table.component.css']
})
export class TutorTableComponent implements OnInit {
  @Input()
  tutors:User[];

  @Input()
  user:User;

  displayedColumns = ['name', 'bio', 'contact'];

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
    for(let i=0;i<this.tutors.length;i++){
      JSON.stringify(this.tutors[i]);
    }
  }

  openDialog(tutor:User, user:User): void {
    let dialogRef = this.dialog.open(TutorPreviewDialogComponent, {
      width: '500px',
      data: { tutor: tutor, user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
