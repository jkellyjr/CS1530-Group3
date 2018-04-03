import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Group, User } from '../../../library/objects/index';
import { GroupPreviewDialog } from '../../group-preview-dialog/group-preview-dialog.component';

@Component({
  selector: 'group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css']
})
export class GroupTableComponent implements OnInit {
  @Input()
  groups:Group[];

  @Input()
  user:User;

  displayedColumns = ['name', 'description', 'join'];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(group:Group, user:User): void {
    let dialogRef = this.dialog.open(GroupPreviewDialog, {
      width: '500px',
      data: { group: group, user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
