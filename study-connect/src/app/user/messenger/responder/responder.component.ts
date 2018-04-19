import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../../user.service';
import { Conversation, Meeting, User } from '../../../library/objects/index';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {
  @Input()
  conversation:Conversation;

  @Input()
  user:User;

  meeting: Meeting;

  constructor(private service:UserService) { }

  ngOnInit() {
  }

  getConversation():void {
    // this.service.getConversation(this.conversation.id).subscribe(
    //   body => {
    //     this.conversation = body;
    //     console.log("got a response");
    //     console.log(JSON.stringify(this.conversation));
    //   }, error =>{
    //     console.log("Poop");
    //   });
  }
}
