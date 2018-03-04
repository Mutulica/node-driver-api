import { Component, OnInit } from '@angular/core';

import { InstructorHttpService } from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public appointments;
  public pastAppointments;
  public dateNow = new Date().getTime();


  constructor(
    public instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(){
    this.instructorHttpService.getMyAppointments().subscribe(
      (res) =>{
        this.appointments = res.filter(this.utilsService.filterFutureAppoint).sort(this.utilsService.orderDateDesc);
      },
      (err) => console.log(err)
    );
  }

  onCompleteAppoint(appoint, index){
    this.instructorHttpService.completeAppointment(appoint)
      .subscribe(
        (res) => {
          if(res.status === 'completed'){
            this.appointments[index] = res;
          }
        },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancelAppoint(appoint, index){
    this.instructorHttpService.deleteStudentAppointment(appoint._id)
      .subscribe(
        (res) => {
          if(res.n === 1){
            this.appointments[index].status = 'canceled';
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
