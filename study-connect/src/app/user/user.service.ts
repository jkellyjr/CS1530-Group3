import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course, Group, Meeting, User } from '../library/objects/index';

@Injectable()
export class UserService {
  restUrl = 'api/';

  tutorsSubject: BehaviorSubject<User[]>;
  tutorsObservable: Observable<User[]>;

  studentsSubject: BehaviorSubject<User[]>;
  studentsObservable: Observable<User[]>;

  groupsSubject: BehaviorSubject<Group[]>;
  groupsObservable: Observable<Group[]>;

  coursesSubject: BehaviorSubject<Course[]>;
  coursesObservable: Observable<Course[]>;

  constructor(private http: Http) {

    this.tutorsSubject = new BehaviorSubject([]);
    this.tutorsObservable = this.tutorsSubject.asObservable();

    this.studentsSubject = new BehaviorSubject([]);
    this.studentsObservable = this.studentsSubject.asObservable();

    this.groupsSubject = new BehaviorSubject([]);
    this.groupsObservable = this.groupsSubject.asObservable();

    this.coursesSubject = new BehaviorSubject([]);
    this.coursesObservable = this.coursesSubject.asObservable();
  }

  getSuggestedTutors(id:number): Observable<User[]> {
    this.tutorsSubject.next([]);

    this.http.get(this.restUrl+ 'tutor/suggested/?user_id='+id)
      .subscribe(
        body => {
          this.tutorsSubject.next(body.json() as User[]);
        }, error => {
          console.log(error.text());
        })
        return this.tutorsObservable;
  }

  getSuggestedStudents(id:number): Observable<User[]> {
    this.studentsSubject.next([]);

    this.http.get(this.restUrl+ 'student/suggested/?user_id='+id)
      .subscribe(
        body => {
          this.studentsSubject.next(body.json() as User[]);
        }, error => {
          console.log(error.text());
        })
        return this.studentsObservable;
  }

  getSuggestedGroups(id:number): Observable<Group[]> {
    this.groupsSubject.next([]);

    this.http.get(this.restUrl + 'group/suggested/?user_id='+id)
      .subscribe(
        body => {
          this.groupsSubject.next(body.json() as Group[]);
          console.log(JSON.stringify(body.json()));
        }, error => {
          console.log(error.text());
        })
        return this.groupsObservable;
  }

  getCourses(): Observable<Course[]> {
    this.coursesSubject.next([]);

    this.http.get(this.restUrl + 'course/')
      .subscribe(
        body => {
          this.coursesSubject.next(body.json() as Course[]);
        }, error => {
          console.log(error.text());
        })
        return this.coursesObservable;
  }

  updateUser(user:User): User{
      this.http.put(this.restUrl + 'user/', user)
        .subscribe(
          body => {
            return (body.json() as User);
          }, error => {

          })
          return new User();
  }

  joinGroup(user:User, groupId:number){
    this.http.post(this.restUrl+'group/join/?group_id='+groupId,user)
      .subscribe(
        body => {

        }, error => {

        })
  }

  get tutors(): Observable<User[]> {
    return this.tutorsObservable;
  }

  get students(): Observable<User[]> {
    return this.studentsObservable;
  }

  get groups(): Observable<Group[]> {
    return this.groupsObservable;
  }

  get courses(): Observable<Course[]> {
    return this.coursesObservable;
  }
}
