import { Injectable } from '@angular/core';

import { Conversation } from '../../library/objects/index';

@Injectable()
export class MessengerService {
  currentConversation: Conversation;

  constructor() {
    this.currentConversation = null;
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
}
