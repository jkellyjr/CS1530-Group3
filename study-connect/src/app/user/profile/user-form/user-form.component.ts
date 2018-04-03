import { Component, OnInit, Input } from '@angular/core';

// import { UserService } from '../../user.service';
import { Course,Group, User } from '../../../library/objects/index';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input()
  user:User;

  @Input()
  oldPass: string;

  @Input()
  newPass: string;

  @Input()
  duplicatePass: string;

  constructor() {

  }

  ngOnInit() {
  }

}
