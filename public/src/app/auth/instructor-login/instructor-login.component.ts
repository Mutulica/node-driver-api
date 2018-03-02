import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent implements OnInit {

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  onLogin(form: NgForm){
    const creditals = {email: form.value.email, password: form.value.password};
    this.authService.instructorLogin(creditals)
      .subscribe(
        (res) => {
          if (res === true) {
              this.router.navigate(['/instructor/profile']);
          } else {
              this.error = 'Username or password is incorrect';
          }
        },
        (err) => console.log(err)
      );
  }
}
