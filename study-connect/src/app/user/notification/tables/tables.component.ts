import { Component, OnInit, Input } from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { Meeting, Message, User, RequestContact } from '../../../library/objects/index';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input()
  user:User;

  constructor() { }

  ngOnInit() {
  }

}
