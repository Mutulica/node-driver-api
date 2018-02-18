import { Component, OnInit } from '@angular/core';

import {InstructorService} from '../../instructor.service';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  public appointments = [];

  constructor(
    public instructorService: InstructorService,
    private commonService: UtilsService
  ) { }

  ngOnInit() {
    this.instructorService.getAppointments().subscribe(
      (res) => {
        this.appointments = res.sort(this.commonService.orderDateDesc);
      }
    );
  }

}
