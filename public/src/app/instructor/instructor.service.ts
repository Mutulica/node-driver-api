import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { InstructorHttpService } from './instructorHTTP.service';
import {StudentDetails} from './models/student-details.model';

@Injectable()

export class InstructorService {

  public studentDetails = new Subject<{}>();

  constructor(private instructorHttpService: InstructorHttpService){}

  onGetStudent(id){
    this.instructorHttpService.getStudent(id).subscribe(
      (res) => {
        //this.studentDetails.next(res);
        // this.studentDetails = res;
        console.log(res);
        return res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
