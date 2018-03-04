import { Component, OnInit } from '@angular/core';

import { InstructorHttpService } from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-schedule-unconfirmed',
  templateUrl: './schedule-unconfirmed.component.html',
  styleUrls: ['./schedule-unconfirmed.component.css']
})
export class ScheduleUnconfirmedComponent implements OnInit {

  public unconfirmedAppoint = [];

  constructor(
    private instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getUnconfirmedAppointments()
      .subscribe(
        (res) => {
          this.unconfirmedAppoint = res.sort(this.utilsService.orderDateDesc);
        },
        (err) => console.log(err)
      )
  }

  onConfirmAppoint(appoint){
    this.instructorHttpService.confirmAppointment(appoint)
      .subscribe(
        (res) => {
          this.unconfirmedAppoint = this.unconfirmedAppoint.filter(
            (el) => {
              return el._id !== res._id;
            }
          );
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onCancelAppoint(appoint){
    const id = appoint._id;
    this.instructorHttpService.deleteStudentAppointment(id)
      .subscribe(
        (res) => {
          if(res.ok === 1){
            this.unconfirmedAppoint = this.unconfirmedAppoint.filter(
              (el) => {
                return el._id !== appoint._id;
              }
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
