import { Component, OnInit, Input } from '@angular/core';

import { RequestContact } from '../../../../library/objects/index';
import { UserService} from '../../../user.service';

@Component({
  selector: 'pending-table',
  templateUrl: './pending-table.component.html',
  styleUrls: ['./pending-table.component.css']
})
export class PendingTableComponent implements OnInit {
  @Input()
  pending: RequestContact[];

  constructor(private service:UserService) { }

  ngOnInit() {
  }

  accept(id:number): void {
    console.log("Accept ID"+id);
    this.service.respondContactRequest(id,'true');
  }

  decline(id:number): void {
    console.log("decline ID"+id);
    this.service.respondContactRequest(id,'false');
  }
}
