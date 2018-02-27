import { Component, OnInit } from '@angular/core';
import { StudentAppointmentsComponent } from './student-appointments/student-appointments.component';

import { StudentHttpService } from '../../studentHTTP.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  public myProfile = {};
  public sessionsCount = 0;

  constructor(
    private studentHttpService: StudentHttpService
  ) { }

  ngOnInit() {
    this.studentHttpService.getStudentProfile()
    .subscribe(
        (res) => {
          this.myProfile = res;
          this.sessionsCount = res.sessions.length;
        },
        (err) => {
          console.log(err);
        }
    );
  }

}