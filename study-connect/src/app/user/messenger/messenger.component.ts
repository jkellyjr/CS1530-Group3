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
  lastConversationId: Number;

  newMessage:String;

  loggedSubscription: ISubscription;
  loggedIn: Boolean;

  constructor(private userService: UserService,
    private authService: AuthService,
    private messengerService: MessengerService) {
      this.conversation = this.messengerService.getCurrentConversation();
      this.lastConversationId = this.conversation.id;
      this.lastMessageCount = 0;
    }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.user = user;
      }
    );

    this.loggedSubscription = this.authService.logged.subscribe(
      logged => {
        this.loggedIn = logged;
      });
    
    this.conversationSubscription = this.messengerService.conversationUpdate.subscribe(
      conversationUpdate => {
        if (conversationUpdate != null) {
          this.updatedConversation = conversationUpdate;
        }
      }
    );
  }

  sendNewMessage() {
    var msg = new Message(this.user.id, this.conversation.id, this.newMessage);
    this.messengerService.sendMessage(msg);
    this.newMessage = "";
  }

}
