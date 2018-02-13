import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { InstructorService } from '../instructor.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  constructor(
    private instructorService: InstructorService,
    private router: Router,
  ) { }

  students = [];

  ngOnInit() {
    this.instructorService.getStudents()
      .subscribe(
        (res : Object[]) => {
          this.students = res;
        }
      );
  }

  onDetails(id){

    this.router.navigate(['/instructor/student-details/' + id]);
    // this.instructorService.getStudent(id).subscribe(
    //   (res: Object) => {
    //     this.router.navigate(['/instructor/student-details']);
    //   }
    // );
  }
}
