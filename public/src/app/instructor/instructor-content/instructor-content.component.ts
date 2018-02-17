import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-instructor-content',
  templateUrl: './instructor-content.component.html',
  styleUrls: ['./instructor-content.component.css']
})
export class InstructorContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Update the AdminLTE layouts
    //AdminLTE.init();
  }

}
