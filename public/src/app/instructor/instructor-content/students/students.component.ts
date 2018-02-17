import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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

  students = [];

  ngOnInit() {
    this.instructorService.getStudents()
      .subscribe(
        (res : Object[]) => {
          this.students = res;
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
