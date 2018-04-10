import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Meeting, Message, User } from '../../library/objects/index';

@Injectable()
export class NotificationService {
  restUrl = 'api/';

  messagesSubject: BehaviorSubject<Message[]>;
  messagesObservable: Observable<Message[]>;

  constructor(private http: Http) {
    this.messagesSubject = new BehaviorSubject([]);
    this.messagesObservable = this.messagesSubject.asObservable();
  }

  getMessages(id:number): Observable<Message[]> {
    this.messagesSubject.next([]);

    this.http.get(this.restUrl+ 'messages/?user_id='+id)
      .subscribe(
        body => {
          this.messagesSubject.next(body.json() as Message[]);
        }, error => {
          console.log(error.text());
        })
        return this.messagesObservable;
  }

  get messages(): Observable<Message[]> {
    return this.messagesObservable;
  }
}
