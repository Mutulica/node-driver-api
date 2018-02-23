import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { StudentDetails } from '../../models/student-details.model';

import { InstructorHttpService } from '../../instructorHTTP.service';
import { InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  private studentId = this.route.snapshot.params['id'];
  public student = {};
  public sessionsCount = 0;

    constructor(
      private route: ActivatedRoute,
      public instructorHttpService: InstructorHttpService,
      public instructorService: InstructorService,
    ) {

    }

  ngOnInit() {

    this.student = this.instructorService.studentDetails;
    
    if(!this.student.hasOwnProperty("_id")){
      this.instructorHttpService.getStudent(this.studentId).subscribe(
        (res) => {
          this.student = res;
          this.sessionsCount = res.sessions.length;
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }
}
