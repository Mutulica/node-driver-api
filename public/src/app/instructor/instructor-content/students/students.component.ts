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

  public students: StudentDetails[] = [];
  public sessionsCount = [];
  public loading = true;

  ngOnInit() {
    this.instructorHttpService.getStudents()
      .subscribe(
        (res : StudentDetails[]) => {
          this.students = res;
          // res.forEach((el) => {
          //   this.countPastAppointments(el["_id"]);
          // });
          this.loading = false;
        },
        (err: any) => {
          console.log(err);
        }
      );

  }

  countPastAppointments(id){
    this.instructorHttpService.getStudentCompletedAppointments(id)
    .subscribe(
      (res) => {
        this.sessionsCount.push(res.length);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectStudent(student){
    this.instructorService.studentDetails = student;
    this.router.navigate(['instructor/students/' + student._id]);
  }

}
