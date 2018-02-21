import { Component, OnInit } from '@angular/core';

import { InstructorHttpService } from '../instructorHTTP.service';

@Component({
  selector: 'app-instructor-left-nav',
  templateUrl: './instructor-left-nav.component.html',
  styleUrls: ['./instructor-left-nav.component.css']
})
export class InstructorLeftNavComponent implements OnInit {

  public instructorDetails: Object = {};
  constructor( private instructorService: InstructorHttpService) { }

  ngOnInit() {
    this.instructorService.getInstructorDetails()
      .subscribe((res) => {
        this.instructorDetails = res;
      },
      (err) => console.log(err)
    );
  }

}
