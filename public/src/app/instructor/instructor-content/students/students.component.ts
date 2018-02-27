import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentDetails } from '../../models/student-details.model';
import { InstructorHttpService } from '../../instructorHTTP.service';
import { InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(
    private instructorHttpService: InstructorHttpService,
    private instructorService: InstructorService,
    private router: Router
  ) { }

  students: StudentDetails[] = [];

  ngOnInit() {
    this.instructorHttpService.getStudents()
      .subscribe(
        (res : StudentDetails[]) => {
          this.students = res;
          this.instructorService.studentsArray = res;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  onSelectStudent(student){
    this.instructorService.studentDetails = student;
    this.router.navigate(['instructor/students/' + student._id]);
  }

}
