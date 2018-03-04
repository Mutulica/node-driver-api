import { Component, OnInit } from '@angular/core';

import {InstructorHttpService} from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  public appointments;

  constructor(
    public instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
   this.instructorHttpService.getMyAppointments().subscribe(
     (res) => this.appointments = res.sort(this.utilsService.orderDateDesc).filter(this.utilsService.filterPastAppoint),
     (err) => console.log(err)
   );

   }

}
