import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable"
import { Subject } from 'rxjs/Subject';

import { UtilsService } from '../shared/utils/utils.service';
import { Instructor } from './models/instructor.model';
import {StudentDetails} from './models/student-details.model';

@Injectable()

export class InstructorService {

  public instructorProfile: Instructor;
  public unconfirmedAppoints = [];
  public myProfile = new Subject<any>();
  public unAppoint = new Subject<any>();

  public newAppoint: EventEmitter<any> = new EventEmitter<any>();

  public studentDetails = {};
  public studentsArray = [];
  public studentAppointments = [];

  constructor(
    private utilsService: UtilsService
  ){}

  setProfile(res){
    this.instructorProfile = res;
    this.myProfile.next(res);
  }
  setStudents(res){
    this.studentsArray = res;
  }

  setUnconfirmedAppointments(res){
    this.unconfirmedAppoints = res;
    this.unAppoint.next(res);
  }
}
