import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentHttpService } from '../studentHTTP.service';

import { StudentService } from '../studentService.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {

  public studentProfile = {};

  constructor(
    private studentHttpService: StudentHttpService,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentProfile = this.studentService.getUserData();
  }

  onLogout(){
    this.studentHttpService.logout().subscribe(
      (res) => {
        this.router.navigate(['student-login']);
        this.authService.studentToken = null;
        localStorage.removeItem('student_token');
        localStorage.removeItem('student');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
