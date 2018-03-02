import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { InstructorHttpService } from '../instructorHTTP.service';

@Component({
  selector: 'app-instructor-header',
  templateUrl: './instructor-header.component.html',
  styleUrls: ['./instructor-header.component.css']
})
export class InstructorHeaderComponent implements OnInit {

  public instructorDetails: Object = {};
  public instructorAppointments = [];
  constructor(
    private route: Router,
    private instructorHttpService: InstructorHttpService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getMyProfile()
      .subscribe((res) => {
        this.instructorDetails = res;
      });

      this.instructorHttpService.getUnconfirmedAppointments().subscribe(
        (res) => {
          this.instructorAppointments = res;
        }
      );
  }

  onLogout(){
    
    this.authService.logout();
    // this.authService.logout().subscribe(
    //   (res) => {
    //     this.authService.token = null;
    //     localStorage.removeItem('currentUser');
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

}
