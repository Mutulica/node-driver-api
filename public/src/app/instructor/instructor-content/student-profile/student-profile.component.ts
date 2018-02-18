import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { StudentDetails } from '../../models/student-details.model';

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
      public instructorService: InstructorService,
    ) {

    }

  ngOnInit() {
    this.instructorService.getStudent(this.studentId).subscribe(
      (res) => {
        this.sessionsCount = res.sessions.length;
        this.student = res;
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
