import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HomeService {
  restUrl = 'api/';

  userSubject: BehaviorSubject<User>;
  userObservable: Observable<User>;


  constructor(private http: Http) {
    this.userSubject = new BehaviorSubject();
    this.userObservable = this.userSubject.asObservable();
  }

  login(info:User): Observable<User> {
    this.userSubject.next([]);

    this.http.post(this.restUrl + 'login?expand=all', info)
      .subscribe(
        body => {
          this.userSubject.next(body.json() as User);
        }, error => {
          console.log(error.text());
        })
        return this.userObservable;
  }

  register(info:User): Observable<User> {
    this.userSubject.next([]);
    this.http.post(this.restUrl+ 'register?expand=all', info)
      .subscribe(
        body =>{
          this.userSubject.next(body.json() as User);
        }, error => {
          console.log(error.text());
        })
        return this.userObservable;
      )
  }

  get user(): Observable<User>{
    return this.userObservable;
  }

}
