import { Injectable, } from '@angular/core';

import { StudentHttpService } from './studentHTTP.service';
import { Student } from '../models/student.model';

@Injectable()

export class StudentService {

public myProfile: Student;
constructor(
  public studentHttp: StudentHttpService
){

  // this.studentHttp.myProfile.subscribe(
  //   (res: Student) => {
  //     this.myProfile =  res;
  //   }
  // )
}

  getUserData(){
    return JSON.parse(localStorage.getItem('student'));
  }
}
