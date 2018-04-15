import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { InstructorHttpService } from '../instructorHTTP.service';
import { InstructorService } from '../instructor.service';
import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'app-instructor-header',
  templateUrl: './instructor-header.component.html',
  styleUrls: ['./instructor-header.component.css']
})
export class InstructorHeaderComponent implements OnInit {

  public instructorDetails: Object = {};
  public completedAppoint = [];
  public unconfirmedAppoint = [];
  constructor(
    private router: Router,
    private instructorHttpService: InstructorHttpService,
    private instructorService: InstructorService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
      this.instructorDetails = this.instructorService.getUserData();
      this.instructorHttpService.getUnconfirmedAppointments().subscribe(
        (res) => {
          this.unconfirmedAppoint = res;
        }
      );

      this.instructorHttpService.getMyAppointments().subscribe(
        (res) =>{
          this.completedAppoint = res.filter(this.utilsService.filterFutureAppoint).sort(this.utilsService.orderDateDesc);
        },
        (err) => console.log(err)
      );
  }

  onLogout(){

    this.instructorHttpService.logout().subscribe(
      (res) => {
        this.router.navigate(['instructor-login']);
        this.authService.instructorToken = null;
        localStorage.removeItem('instructor_token');
        localStorage.removeItem('instructor');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
