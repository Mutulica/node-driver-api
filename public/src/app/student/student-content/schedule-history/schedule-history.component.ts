import { Component, OnInit } from '@angular/core';

import { StudentHttpService } from '../../studentHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-schedule-history',
  templateUrl: './schedule-history.component.html',
  styleUrls: ['./schedule-history.component.css']
})
export class ScheduleHistoryComponent implements OnInit {

  public studentSessions = [];
  constructor(
    private studentHttpService: StudentHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.studentHttpService.getPastAppointments()
    .subscribe(
        (res) => {
          this.studentSessions = res;
        },
        (err) => {
          console.log(err);
        }
    );
  }

}
