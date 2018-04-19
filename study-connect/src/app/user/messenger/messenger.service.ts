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

  pollingInterval: number;

  constructor(private http: Http) {
    this.currentConversation = null;

    this.conversationSubject = new BehaviorSubject(null);
    this.conversationObservable = this.conversationSubject.asObservable();

    try {
      clearInterval(this.pollingInterval);
    } catch (error) {
      
    }
  }

  setCurrentConversation(c:Conversation): void{
    try {
      clearInterval(this.pollingInterval);
    } catch (error) {
      
    }
    this.currentConversation = c;
    this.pollingInterval = setInterval(this.pollConvo.bind(this), 2000);
    
  }

  getCurrentConversation(): Conversation {
    return this.currentConversation;
  }

  resetCurrentConversation(): void {
    try {
      clearInterval(this.pollingInterval);
    } catch (error) {
      
    }
    this.currentConversation = null;
  }

  getConversation(): Observable<Conversation> {
    this.http.get('api/conversation/?id='+this.currentConversation.id).subscribe(
      body => {
        this.conversationSubject.next(body.json() as Conversation);
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

  pollConvo() {
    this.getConversation();
  }

  get conversationUpdate(): Observable<Conversation> {
    return this.conversationObservable;
  }
}
