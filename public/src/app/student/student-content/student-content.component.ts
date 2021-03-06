import { Component, OnInit } from '@angular/core';
import { StudentService } from '../studentService.service';

@Component({
  selector: 'app-student-content',
  templateUrl: './student-content.component.html',
  styleUrls: ['./student-content.component.css']
})
export class StudentContentComponent implements OnInit {

  public myProfile;
  constructor(
    private stundetService: StudentService
  ) { }

  ngOnInit() {
    this.myProfile = this.stundetService.getUserData();
  }

}
