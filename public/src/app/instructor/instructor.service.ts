import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


import {StudentDetails} from './models/student-details.model';



export class InstructorService {

  public studentDetails = {};
  public studentsArray = [];
  public studentAppointments = [];

  constructor(){}

}
