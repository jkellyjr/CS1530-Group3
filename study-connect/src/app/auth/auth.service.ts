import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from '../library/objects/User';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  restUrl = 'api/';

  userSubject: BehaviorSubject<User>;
  userObservable: Observable<User>;

  constructor(private http: Http) {
    this.userSubject = new BehaviorSubject(null);
    this.userObservable = this.userSubject.asObservable();
  }

  login(info:User): Observable<Boolean> {
    this.userSubject.next(null);

    this.http.post(this.restUrl + 'login/', info)
      .subscribe(
        body => {
          this.userSubject.next(body.json() as User);

          return Observable.of(true);
        }, error => {
          console.log(error.text());
        })
        return Observable.of(false);
  }

  register(info:User): Observable<Boolean> {
    this.userSubject.next(null);
    this.http.post(this.restUrl+ 'register/', info)
      .subscribe(
        body =>{
          this.userSubject.next(body.json() as User);

          return Observable.of(true);
        }, error => {
          console.log(error.text());
        })
        return Observable.of(false);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userSubject.next(null);
  }

  get user(): Observable<User>{
    return this.userObservable;
  }
}
