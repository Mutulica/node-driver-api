import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { InstructorHttpService } from '../../../instructorHTTP.service';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-student-appointments',
  templateUrl: './student-appointments.component.html',
  styleUrls: ['./student-appointments.component.css']
})
export class StudentAppointmentsComponent implements OnInit {

  constructor(
    public instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  private studentId = this.route.snapshot.params['id'];
  public student = {};
  private appointmentId: Number;
  public studentAppointments = [];
  public selectedMoment = new Date();

  ngOnInit() {
    this.instructorHttpService.getStudentAppointments(this.studentId)
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
    this.instructorHttpService.deleteStudentAppointment(this.appointmentId)
      .subscribe(
        (res) => {
          if(res.n === 1){
            var updatedAppointments = this.studentAppointments.filter((el) => {
              return el._id !== this.appointmentId;
            });
            this.studentAppointments = updatedAppointments.sort(this.utilsService.orderDateDesc);
            this.instructorHttpService.studentAppointments = updatedAppointments.sort(this.utilsService.orderDateDesc);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onReschedule(){
    const date = this.selectedMoment.getTime();
    const data = {
      date: date,
      id : this.appointmentId
    }
    this.instructorHttpService.rescheduleStudentAppointment(data).subscribe(
      (res) => {
        var updatedAppointment = this.studentAppointments.filter((el) => {
          return el._id === this.appointmentId;
        });
        var index = this.studentAppointments.indexOf(updatedAppointment[0]);
        if(index !== -1){
          this.studentAppointments[index] = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
