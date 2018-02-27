import { Component, OnInit } from '@angular/core';

import { InstructorHttpService } from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {

  public myProfile = {};
  public workingSchedule = [];
  public daysOfWeek = this.utilsService.daysOfWeek;

  constructor(
    private instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.instructorHttpService.getMyProfile().subscribe(
      (res) => {
        //this.myProfile = res.sort(this.utilsService.orderDayAsc);
        this.workingSchedule = res.instructorSchedule.sort(this.utilsService.orderDayAsc);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
