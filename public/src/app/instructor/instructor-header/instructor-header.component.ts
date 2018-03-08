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
    private route: Router,
    private instructorHttpService: InstructorHttpService,
    private instructorService: InstructorService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getMyProfile()
      .subscribe((res) => {
        this.instructorDetails = res;
      });

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
