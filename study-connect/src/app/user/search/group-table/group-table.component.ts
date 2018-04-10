import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Group, User } from '../../../library/objects/index';
import { GroupPreviewDialog } from './group-preview-dialog/group-preview-dialog.component';

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
  // dataSource = new MatTableDataSource<Group>(this.groups);
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log("In group table component");
    console.log("lenght: "+this.groups.length);
    for(let i=0;i<this.groups.length;i++){
      console.log(JSON.stringify(this.groups[i]));
    }
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
