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
  temp: RequestContact[];

  @Input()
  userId:number;

  pending: RequestContact[];

  displayedColumns = ['user', 'message'];
  constructor(private service:UserService) {
    this.pending = new Array<RequestContact>();
  }

  ngOnInit() {
    for(let i=0;i<this.temp.length;i++){
      if(this.temp[i].requestor_id == this.userId){
        this.pending.push(this.temp[i]);
      }
    }
  }

}
