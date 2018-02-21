import { Component, OnInit } from '@angular/core';

import {InstructorHttpService} from '../../instructorHTTP.service';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  public appointments = [];

  constructor(
    public instructorHttpService: InstructorHttpService,
    private commonService: UtilsService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getAppointments().subscribe(
      (res) => {
        this.appointments = res.sort(this.commonService.orderDateDesc);
      }
    );
  }

}
