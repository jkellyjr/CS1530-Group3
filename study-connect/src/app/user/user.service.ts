import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../library/objects/User';
import { Group } from '../library/objects/Group';
import { Course } from '../library/objects/Course';

@Injectable()
export class UserService {
  restUrl = 'api/';

  userSubject: BehaviorSubject<User>;
  userObservable: Observable<User>;

  tutorsSubject: BehaviorSubject<User[]>;
  tutorsObservable: Observable<User[]>;

  studentsSubject: BehaviorSubject<User[]>;
  studentsObservable: Observable<User[]>;

  groupsSubject: BehaviorSubject<Group[]>;
  groupsObservable: Observable<Group[]>;

  coursesSubject: BehaviorSubject<Course[]>;
  coursesObservable: Observable<Course[]>;

  constructor(private http: Http) {
    this.userSubject = new BehaviorSubject(null);
    this.userObservable = this.userSubject.asObservable();

    this.tutorsSubject = new BehaviorSubject([]);
    this.tutorsObservable = this.studentsSubject.asObservable();

    this.studentsSubject = new BehaviorSubject([]);
    this.studentsObservable = this.studentsSubject.asObservable();

    this.groupsSubject = new BehaviorSubject([]);
    this.groupsObservable = this.groupsSubject.asObservable();

    this.coursesSubject = new BehaviorSubject([]);
    this.coursesObservable = this.coursesSubject.asObservable();
  }

  getTutors(courseNum:number): Observable<User[]> {
    this.tutorsSubject.next([]);

    this.http.get(this.restUrl+ 'tutor/?course_num=courseNum' + courseNum)
      .subscribe(
        body => {
          this.tutorsSubject.next(body.json() as User[]);
        }, error => {
          console.log(error.text());
        })
        return this.tutorsObservable;
  }

  getStudents(courseNum:number): Observable<User[]> {
    this.studentsSubject.next([]);

    this.http.get(this.restUrl+ 'user/?course_num=courseNum' + courseNum)
      .subscribe(
        body => {
          this.studentsSubject.next(body.json() as User[]);
        }, error => {
          console.log(error.text());
        })
        return this.studentsObservable;
  }

  getGroups(courseNum:number): Observable<Group[]> {
    this.groupsSubject.next([]);

    this.http.get(this.restUrl + 'group/?course_num=courseNum' + courseNum)
      .subscribe(
        body => {
          this.groupsSubject.next(body.json() as Group[]);
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

  updateUser(user:User): Observable<User>{
      this.userSubject.next(null);

      this.http.put(this.restUrl + 'user/', user)
        .subscribe(
          body => {
            this.userSubject.next(body.json() as User)
          }, error => {

          })
          return this.userObservable;
  }

  get user(): Observable<User>{
    return this.userObservable;
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
