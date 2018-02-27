import { Component, OnInit } from '@angular/core';

import { StudentHttpService } from '../../../studentHTTP.service';
import { UtilsService } from '../../../../shared/utils/utils.service';

@Component({
  selector: 'app-student-appointments',
  templateUrl: './student-appointments.component.html',
  styleUrls: ['./student-appointments.component.css']
})
export class StudentAppointmentsComponent implements OnInit {

  public studentAppointments = [];
  constructor(
    private studentHttpService: StudentHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {

    this.studentHttpService.getStudentAppointments()
      .subscribe(
        (res) => {
          this.studentAppointments = res.sort(this.utilsService.orderDateDesc);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
