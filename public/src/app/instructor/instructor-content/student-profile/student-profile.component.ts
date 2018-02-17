import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import { DateTimeAdapter } from 'ng-pick-datetime';

import { InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  private studentId = this.route.snapshot.params['id'];
  public student: Object = {};
  public studentAppointments = [];

  public selectedMoment = new Date();

  public myFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
  }

  constructor(
    private route: ActivatedRoute,
    public instructorService: InstructorService,
    private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    dateTimeAdapter.setLocale('ro-RO');
  }

  ngOnInit() {
    console.log();
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
          this.studentAppointments.push(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onAppointmentDelte(id){
    this.instructorService.deleteStudentAppointment(id)
      .subscribe(
        (res) => {
          if(res.n === 1){
            var updatedAppointments = this.studentAppointments.filter((el) => {
              return el._id !== id;
            });
            this.studentAppointments = updatedAppointments;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
