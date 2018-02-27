import { Component, OnInit } from '@angular/core';

import { StudentHttpService } from '../studentHTTP.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {

  public studentProfile = {};

  constructor(private studentHttpService: StudentHttpService) { }

  ngOnInit() {

    this.studentHttpService.getStudentProfile()
    .subscribe(
        (res) => {
          this.studentProfile = res;
        },
        (err) => {
          console.log(err);
        }
    );
  }

}
