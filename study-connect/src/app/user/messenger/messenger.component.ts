import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Group, User, Conversation, Message } from '../../library/objects/index';
import { ISubscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/index';
import { MessengerService} from './messenger.service';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  user: User;
  userSubscription:ISubscription;

  conversation:Conversation;

  updatedConversation:Conversation;
  conversationSubscription:ISubscription;
  lastMessageCount:number;

  newMessage:String;

  constructor(private userService: UserService,
    private authService: AuthService,
    private messengerService: MessengerService) {
      this.conversation = this.messengerService.getCurrentConversation();
      this.lastMessageCount = 0;
    }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
      }
    );
    
    this.conversationSubscription = this.messengerService.conversationUpdate.subscribe(
      conversationUpdate => {
        if (conversationUpdate != null) {
          this.updatedConversation = conversationUpdate;
          var newMessageCount = this.updatedConversation.messages.length;
          if (newMessageCount > this.lastMessageCount) {
            for(var i = this.lastMessageCount; i < newMessageCount; i++) {
              this.addMessage(this.updatedConversation.messages[i]);
            }
          }
          this.lastMessageCount = newMessageCount;
        }
      }
    );
    setInterval(this.pollConvo.bind(this), 5000);
  }

  pollConvo() {
    var temp = this.messengerService.getConversation();
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

  sendNewMessage() {
    var msg = new Message(this.user.id, this.conversation.id, this.newMessage);
    this.messengerService.sendMessage(msg);
    this.newMessage = "";
  }

}
