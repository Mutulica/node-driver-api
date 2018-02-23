import { Component, OnInit } from '@angular/core';

import { InstructorHttpService } from '../../instructorHTTP.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {

  public myProfile = {};

  constructor(
    private instructorHttpService: InstructorHttpService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getMyProfile().subscribe(
      (res) => {
        this.myProfile = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
