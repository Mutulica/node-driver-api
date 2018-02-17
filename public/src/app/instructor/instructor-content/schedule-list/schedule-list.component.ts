import { Component, OnInit } from '@angular/core';
import {InstructorService} from '../../instructor.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  public appointments = [];

  constructor(public instructorService: InstructorService) { }

  ngOnInit() {
    this.instructorService.getAppointments().subscribe(
      (res) => {
        console.log(res);
        this.appointments = res;
      }
    );
  }

}
