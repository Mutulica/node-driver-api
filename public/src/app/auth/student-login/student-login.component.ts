import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { StudentHttpService } from '../../student/studentHTTP.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private studentHttpService: StudentHttpService
  ) { }

  ngOnInit() {
    // reset login status
    //this.authService.logoutStudent();
    if (localStorage.getItem('student')) {
      this.router.navigate(['/student/profile']);
    }
  }

  onLogin(form: NgForm){
    const creditals = {email: form.value.email, password: form.value.password};
    this.authService.studentLogin(creditals)
      .subscribe(
        (res) => {
          if (res === true) {
            this.router.navigate(['/student/profile']);
          } else {
              this.error = 'Email-ul sau parola sunt incorecte';
          }
        },
        (err) => console.log(err)
      );
  }

}
