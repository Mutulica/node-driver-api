import { Component, OnInit } from '@angular/core';

import { StudentHttpService } from '../../studentHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  public appointments = [];

  constructor(
    private studentHttpService: StudentHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.studentHttpService.getStudentAppointments()
      .subscribe(
        (res) => {
          this.appointments = res.sort(this.utilsService.orderDateDesc);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
