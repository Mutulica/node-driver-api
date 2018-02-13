import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';

import {InstructorService } from '../../instructor.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
  public obj = {};
  constructor(private instructorService: InstructorService) { }

  ngOnInit() {
  }

  onRegisterStudent(form: NgForm){
    this.obj = {
     email: form.value.email,
     password: form.value.password,
     firstName: form.value.firstName,
     lastName: form.value.lastName,
     phone: form.value.phone
   }
    this.instructorService.registerStudent(this.obj).subscribe(
      (res) => {
        this.obj = res;
      }
    );
  }
}
