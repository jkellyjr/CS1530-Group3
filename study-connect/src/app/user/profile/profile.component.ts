import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  coursesOffered = [
    {value: 'CS1530', viewValue: 'CS1530'},
    {value: 'CS1550', viewValue: 'CS1550'},
    {value: 'CS1555', viewValue: 'CS1555'}
  ];

  studentOrTutor = [
    {value: 'student', viewValue: 'Currently Taking'},
    {value: 'tutor', viewValue: 'Have Taken'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
