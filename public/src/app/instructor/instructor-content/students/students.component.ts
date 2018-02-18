import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { StudentDetails } from '../../models/student-details.model';
import { InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(
    private instructorService: InstructorService,
    private router: Router
  ) { }

  students: StudentDetails[] = [] ;

  ngOnInit() {
    this.instructorService.getStudents()
      .subscribe(
        (res : StudentDetails[]) => {
          this.students = res;
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  onSelectStudent(id){
    this.router.navigate(['instructor/students/' + id])
  }

}
