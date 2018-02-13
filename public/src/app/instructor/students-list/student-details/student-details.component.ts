import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import { DateTimeAdapter } from 'ng-pick-datetime';

import { InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  public student: Object = {};
  public studentAppointments = [];
  private studentId = this.route.snapshot.params['id'];
  public selectedMoment = new Date();

  public myFilter = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    }

  constructor(
    public instructorService: InstructorService,
    private route: ActivatedRoute,
    dateTimeAdapter: DateTimeAdapter<any>
  ) {
    dateTimeAdapter.setLocale('ro-RO');
  }

  ngOnInit() {
    this.instructorService.getStudent(this.studentId).subscribe(
      (res: Object) => {
        this.student = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.instructorService.getStudentAppointments(this.studentId)
    .subscribe(
      (res) => {
        this.studentAppointments = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onChangeDate(){
    var data = {studentId: this.studentId, date: this.selectedMoment.getTime()};
    this.instructorService.addAppointment(data)
    .subscribe(
      (res) => {
        this.studentAppointments = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
