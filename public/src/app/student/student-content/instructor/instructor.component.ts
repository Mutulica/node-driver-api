import { Component, OnInit } from '@angular/core';

import { StudentHttpService } from '../../studentHTTP.service';
import { StudentService } from '../../studentService.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  private myProfile: Student;
  public instructor;
  constructor(
    private studentHTTP: StudentHttpService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.myProfile = this.studentService.getUserData();
    this.getInstructorDetails();
  }

  getInstructorDetails(){
    this.studentHTTP.getInstructorProfile(this.myProfile._instructorId)
      .subscribe(
        (res) => {
          this.instructor = res;
        }
      )
  }
}
