import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {InstructorService } from '../../instructor.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  public obj = {};

    constructor(private instructorService: InstructorService) { }

    ngOnInit() {
    }

    onRegisterStudent(form: NgForm){
      console.log(form.value);
      this.obj = {
       email: form.value.email,
       password: form.value.password,
       firstName: form.value.firstName,
       lastName: form.value.lastName,
       phone: form.value.phone
     }
      this.instructorService.registerStudent(this.obj).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
}
