import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Conversation, Message } from '../../library/objects/index';

@Injectable()
export class MessengerService {
  currentConversation: Conversation;

  conversationSubject: BehaviorSubject<Conversation>;
  conversationObservable: Observable<Conversation>;

  constructor(private http: Http) {
    this.currentConversation = null;

    this.conversationSubject = new BehaviorSubject(null);
    this.conversationObservable = this.conversationSubject.asObservable();
  }

  setCurrentConversation(c:Conversation): void{
    this.currentConversation = c;
  }

  getCurrentConversation(): Conversation {
    return this.currentConversation;
  }

  resetCurrentConversation(): void {
    this.currentConversation = null;
  }

  getConversation(): Observable<Conversation> {
    this.http.get('api/conversation/?id='+this.currentConversation.id).subscribe(
      body => {
        this.conversationSubject.next(body.json() as Conversation);
        console.log(body.json());
      },
      error => {
        console.log(error.text());
      }
    )
    return this.conversationObservable;
  }

  sendMessage(message:Message): void {
    this.http.post('api/message/', message).subscribe(
      body=>{
        console.log("successful message posted");
      },
      error =>{
        console.log(error.text());
        console.log("Unsuccessful message send");
      }
    )
  }

  get conversationUpdate(): Observable<Conversation> {
    return this.conversationObservable;
  }
}
