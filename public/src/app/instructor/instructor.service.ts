import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable"
import { Subject } from 'rxjs/Subject';

import { InstructorHttpService } from './instructorHTTP.service';
import { UtilsService } from '../shared/utils/utils.service';
import {StudentDetails} from './models/student-details.model';

@Injectable()

export class InstructorService {

  public instructorAppointments: Observable<any> = new Observable;
  public studentDetails = {};
  // public studentsArray = [];
  public studentAppointments = [];

  constructor(
    private instructorHttp: InstructorHttpService,
    private utilsService: UtilsService
  ){}

  // getAppointments(){
  //   this.instructorHttp.getAppointments().subscribe(
  //     (res: Object[]) => {
  //       //this.instructorAppointments = res.filter(this.utilsService.filterPastAppoint).sort(this.utilsService.orderDateDesc);
  //       this.instructorAppointments.next(res.filter(this.utilsService.filterPastAppoint).sort(this.utilsService.orderDateDesc));
  //       console.log(this.instructorAppointments);
  //       return res;
  //     }
  //   );
  // }
}
