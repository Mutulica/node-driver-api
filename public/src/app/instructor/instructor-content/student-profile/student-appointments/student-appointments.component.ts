import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { InstructorHttpService } from '../../../instructorHTTP.service';
import { InstructorService } from '../../../instructor.service';
import { UtilsService } from '../../../../shared/utils/utils.service';

@Component({
  selector: 'app-student-appointments',
  templateUrl: './student-appointments.component.html',
  styleUrls: ['./student-appointments.component.css']
})
export class StudentAppointmentsComponent implements OnInit {

  constructor(
    public instructorHttpService: InstructorHttpService,
    public instructorService: InstructorService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  private studentId = this.route.snapshot.params['id'];
  private appointmentId: Number;
  public appointmentIndex;
  public studentConfirmedAppointments = [].sort(this.utilsService.orderDateDesc);
  public selectedMoment = new Date();
  public appointmentDateChanged = Number;

  ngOnInit() {

      this.instructorHttpService.getStudentAppointments(this.studentId)
      .subscribe(
        (res) => {
          this.studentConfirmedAppointments = this.instructorHttpService.studentAppointments.filter((el) => {
            return el['confirmed'] === true;
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onAppointmentId(id, index){
    this.appointmentId = id;
    this.appointmentIndex = index;
  }

  onAppointmentDelete(){
    this.instructorHttpService.deleteStudentAppointment(this.appointmentId)
      .subscribe(
        (res) => {
          if(res.n === 1){
            var updatedAppointments = this.studentConfirmedAppointments.filter((el) => {
              return el._id !== this.appointmentId;
            });
            this.studentConfirmedAppointments = updatedAppointments.sort(this.utilsService.orderDateDesc);
            this.instructorHttpService.studentAppointments = this.studentConfirmedAppointments;

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
        var updatedAppointment = this.studentConfirmedAppointments.filter((el) => {
          return el._id === this.appointmentId;
        });
        var index = this.studentConfirmedAppointments.indexOf(updatedAppointment[0]);
        if(index !== -1){
          this.studentConfirmedAppointments[index] = res;
          this.studentConfirmedAppointments.sort(this.utilsService.orderDateDesc);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
