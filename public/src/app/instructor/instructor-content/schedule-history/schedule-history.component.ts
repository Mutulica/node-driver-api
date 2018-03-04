import { Component, OnInit } from '@angular/core';

import { InstructorHttpService } from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-schedule-history',
  templateUrl: './schedule-history.component.html',
  styleUrls: ['./schedule-history.component.css']
})
export class ScheduleHistoryComponent implements OnInit {
  public pastAppointments;

  constructor(
    public instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getAppointmentsHistory().subscribe(
      (res) =>{
        this.pastAppointments = res.sort(this.utilsService.orderDateDesc);
      },
      (err) => console.log(err)
    );
  }

}
