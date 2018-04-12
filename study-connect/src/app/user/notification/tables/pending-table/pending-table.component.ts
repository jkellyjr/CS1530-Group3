import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RequestContact } from '../../../../library/objects/index';
import { UserService} from '../../../user.service';

@Component({
  selector: 'pending-table',
  templateUrl: './pending-table.component.html',
  styleUrls: ['./pending-table.component.css']
})
export class PendingTableComponent implements OnInit {
  @Input()
  tempOne: RequestContact[];

  @Input()
  tempTwo: RequestContact[];

  @Input()
  userId:number;

  pending: RequestContact[];

  displayedColumns = ['user', 'message'];
  constructor(private service:UserService) {
    this.pending = new Array<RequestContact>();
  }

  ngOnInit() {
    for(let i=0;i<this.tempOne.length;i++){
      if(this.tempOne[i].requestor_id != this.userId){
        this.pending.push(this.tempOne[i]);
      }
    }

    for(let i=0;i<this.tempTwo.length;i++){
      if(this.tempTwo[i].requestor_id != this.userId){
        this.pending.push(this.tempTwo[i]);
      }
    }
  }

}
