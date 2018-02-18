import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { InstructorService } from '../../../instructor.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-student-appointments',
  templateUrl: './student-appointments.component.html',
  styleUrls: ['./student-appointments.component.css']
})
export class StudentAppointmentsComponent implements OnInit {

  constructor(
    public instructorService: InstructorService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  private studentId = this.route.snapshot.params['id'];
  public student = {};
  private appointmentId: Number;
  public studentAppointments = [];

  ngOnInit() {
    this.instructorService.getStudentAppointments(this.studentId)
    .subscribe(
      (res) => {
        this.studentAppointments = res.sort(this.utilsService.orderDateDesc);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAppointmentId(id){
    this.appointmentId = id;
  }

  onAppointmentDelete(){
    this.instructorService.deleteStudentAppointment(this.appointmentId)
      .subscribe(
        (res) => {
          if(res.n === 1){
            var updatedAppointments = this.studentAppointments.filter((el) => {
              return el._id !== this.appointmentId;
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
