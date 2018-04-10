import { Component, OnInit } from '@angular/core';
import { StudentAppointmentsComponent } from './student-appointments/student-appointments.component';

import {Student} from '../../../models/student.model';

import { StudentHttpService } from '../../studentHTTP.service';
import { StudentService } from '../../studentService.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  public myProfile: Student = JSON.parse(localStorage.getItem('student'));
  public sessionsCount = 0;
  public loading = true;

  constructor(
    public studentHttpService: StudentHttpService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    // console.log(JSON.parse(localStorage.getItem('student')).user);
    // this.myProfile = JSON.parse(localStorage.getItem('student')).user;
    // this.studentHttpService.myProfile.subscribe(
    //   (res: Student) => {
    //     this.myProfile = res;
    //   }
    // );
     this.myProfile = this.studentService.getUserData();
    this.studentHttpService.getPastAppointments()
    .subscribe(
      (res) => this.sessionsCount = res.length,
      (err) => console.log(err)
    )
  }

}
