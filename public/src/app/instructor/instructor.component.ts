import { Component, OnInit } from '@angular/core';

import { InstructorService } from './instructor.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  constructor(private instructorService: InstructorService) { }

  ngOnInit() {

  }

}
