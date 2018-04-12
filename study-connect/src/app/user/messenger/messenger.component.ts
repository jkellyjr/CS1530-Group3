import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Group, User } from '../../library/objects/index';
import { ISubscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/index';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  constructor(private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
        console.log(JSON.stringify(this.user));
      });
  }

  addMessage(m) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("messageWrapper");

    var message = document.createElement("div");
    message.classList.add("message");
    var label = document.createElement("div");
    label.classList.add("messageLabel");

    //TODO: Check if user signed in is the message sender
    if (this.user.id == m.sender_id) {
        message.classList.add("mine");
    }
    else {
        message.classList.add("others");
    }
    label.textContent = m.sender_name + ":";
    
    message.appendChild(label);

    var textNode = document.createTextNode(m.content);
    message.appendChild(textNode);

    wrapper.appendChild(message);

    var content = document.getElementById("chatContent");
    content.appendChild(wrapper);
  } 

}
