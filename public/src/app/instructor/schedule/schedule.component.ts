import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../instructor.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public appointments = [];

  constructor(public instructorService: InstructorService) { }

  ngOnInit() {
    this.instructorService.getAppointments().subscribe(
      (res) => {
        this.appointments = res;
      }
    );
  }

}
