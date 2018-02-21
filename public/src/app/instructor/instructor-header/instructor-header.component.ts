import { Component, OnInit } from '@angular/core';
import { InstructorHttpService } from '../instructorHTTP.service';

@Component({
  selector: 'app-instructor-header',
  templateUrl: './instructor-header.component.html',
  styleUrls: ['./instructor-header.component.css']
})
export class InstructorHeaderComponent implements OnInit {

  public instructorDetails: Object = {};
  public instructorAppointments = [];
  constructor( private instructorHttpService: InstructorHttpService) { }

  ngOnInit() {
    this.instructorHttpService.getInstructorDetails()
      .subscribe((res) => {
        this.instructorDetails = res;
      });

      this.instructorHttpService.getUnconfirmedAppointments().subscribe(
        (res) => {
          this.instructorAppointments = res;
        }
      );
  }

}
