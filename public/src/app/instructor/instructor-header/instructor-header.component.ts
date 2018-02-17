import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../instructor.service';

@Component({
  selector: 'app-instructor-header',
  templateUrl: './instructor-header.component.html',
  styleUrls: ['./instructor-header.component.css']
})
export class InstructorHeaderComponent implements OnInit {

  public instructorDetails: Object = {};
  public instructorAppointments = [];
  constructor( private instructorService: InstructorService) { }

  ngOnInit() {
    this.instructorService.getInstructorDetails()
      .subscribe((res) => {
        this.instructorDetails = res;
      });

      this.instructorService.getUnconfirmedAppointments().subscribe(
        (res) => {
          this.instructorAppointments = res;
        }
      );
  }

}
