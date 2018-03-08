import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { InstructorService } from '../../instructor.service';
import { InstructorHttpService } from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {

  public myProfile: Object = {};
  //public workingSchedule = [];
  public daysOfWeek = this.utilsService.daysOfWeek;
  subscription: Subscription;

  constructor(
    private instructorService: InstructorService,
    private instructorHttpService: InstructorHttpService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {

    this.instructorService.myProfile.subscribe(
      (res) => this.myProfile = res,
      (err) => console.log(err)
    );
    this.myProfile = this.instructorService.instructorProfile;
  }

}
