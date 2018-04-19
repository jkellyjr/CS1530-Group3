import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course, Conversation, Group, Meeting, User, RequestContact, MeetingRequest, Message, Request } from '../library/objects/index';

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

  groupSearchSubject: BehaviorSubject<Group[]>;
  groupSearchObservable: Observable<Group[]>;

  tutorSearchSubject: BehaviorSubject<User[]>;
  tutorSearchObservable: Observable<User[]>;

  studentSearchSubject: BehaviorSubject<User[]>;
  studentSearchObservable: Observable<User[]>;

  constructor(private http: Http) {

    this.tutorsSubject = new BehaviorSubject([]);
    this.tutorsObservable = this.tutorsSubject.asObservable();

    this.studentsSubject = new BehaviorSubject([]);
    this.studentsObservable = this.studentsSubject.asObservable();

    this.groupsSubject = new BehaviorSubject([]);
    this.groupsObservable = this.groupsSubject.asObservable();

    this.coursesSubject = new BehaviorSubject([]);
    this.coursesObservable = this.coursesSubject.asObservable();

    this.groupSearchSubject = new BehaviorSubject([]);
    this.groupSearchObservable = this.groupSearchSubject.asObservable();

    this.tutorSearchSubject = new BehaviorSubject([]);
    this.tutorSearchObservable = this.tutorSearchSubject.asObservable();

    this.studentSearchSubject = new BehaviorSubject([]);
    this.studentSearchObservable = this.studentSearchSubject.asObservable();

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

  searchGroups(user_id:number, course_id:number): Observable<Group[]> {
    this.groupSearchSubject.next([]);

    this.http.get('api/search/?user_id='+user_id+"&course_id="+course_id+"&search_type=group")
      .subscribe(
        body => {
          this.groupSearchSubject.next(body.json() as Group[]);
          console.log(JSON.stringify(body.json()));
        }, error => {
          console.log(error.text());
        })
        return this.groupSearchObservable;
  }

  searchTutors(user_id:number, course_id:number): Observable<User[]> {
    this.tutorSearchSubject.next([]);

    this.http.get('api/search/?user_id='+user_id+"&course_id="+course_id+"&search_type=tutor")
      .subscribe(
        body => {
          this.tutorSearchSubject.next(body.json() as User[]);
        }, error => {
          console.log(error.text());
        })
        return this.tutorSearchObservable;
  }

  searchStudents(user_id:number, course_id:number): Observable<User[]> {
    this.studentSearchSubject.next([]);

    this.http.get('api/search/?user_id='+user_id+"&course_id="+course_id+"&search_type=student")
      .subscribe(
        body => {
          this.studentSearchSubject.next(body.json() as User[]);
        }, error => {
          console.log(error.text());
        })
        return this.studentSearchObservable;
  }

  sendContactRequest(request:Request): void {
    this.http.post('api/request/contact/',request).subscribe(
      body=>{
        console.log("succesful contact request")
    }, error =>{
      console.log(error.text());
      console.log("Unsuccessful contact request");
    })
  }

  respondContactRequest(id:number, accepted:string): void {
    this.http.post('api/request/contact/?id='+id+'&accepted='+accepted, null).subscribe(
      body=>{
        console.log("succesful contact request response")
    }, error =>{
      console.log(error.text());
      console.log("Unsuccessful contact request response");
    })
  }

  sendMeetingRequest(request:Meeting): void {
    this.http.post('api/schedule/',request).subscribe(
      body=>{
        console.log("succesful meeting request")
    }, error =>{
      console.log(error.text());
      console.log("Unsuccessful meeting request");
    })
  }

  respondMeetingRequest(request:Meeting): void {
    this.http.post('api/schedule/', request).subscribe(
      body=>{
        console.log("succesful meeting request response")
    }, error =>{
      console.log(error.text());
      console.log("Unsuccessful meeting request response");
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

  get searchGroupResult(): Observable<Group[]> {
    return this.groupSearchObservable;
  }
  get searchTutorResult(): Observable<User[]> {
    return this.tutorSearchObservable;
  }
  get searchStudentResult(): Observable<User[]> {
    return this.tutorSearchObservable;
  }
}
