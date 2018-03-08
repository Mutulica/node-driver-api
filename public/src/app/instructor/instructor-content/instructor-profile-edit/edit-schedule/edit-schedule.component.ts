import { Component, OnInit, Input } from '@angular/core';
import { DateTimeAdapter } from 'ng-pick-datetime';

import { UtilsService } from '../../../../shared/utils/utils.service';
import { InstructorHttpService } from '../../../instructorHTTP.service';
import { InstructorService } from '../../../instructor.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  @Input() myProfile;
  public daysOfWeek = this.utilsService.daysOfWeek;
  public showHours = false;
  public selectedDay;
  public weekSchedule = [];

  private newDate = new Date();
  private year = this.newDate.getFullYear();
  private month = this.newDate.getMonth();
  private day = this.newDate.getDay();

  public timeFrom = new Date(this.year, this.month, this.day, 7);
  public timeTo = new Date(this.year, this.month, this.day, 18);

  public timeFromInMl;
  public timeToInMl;
  constructor(
    public utilsService: UtilsService,
    public instructorHttpService: InstructorHttpService,
    public instructorService: InstructorService,
    private dateTimeAdapter: DateTimeAdapter<any>
  ) {
    dateTimeAdapter.setLocale('ro-RO');
  }

  ngOnInit() {
    this.instructorService.myProfile.subscribe(
      (res) => {
        this.myProfile = res;
        console.log(res);
      },
      err => console.log(err)
    );
    this.myProfile = this.instructorService.instructorProfile;
  }

  onChangeFrom(hours){
    const minutes = hours.getMinutes();
    const timer = hours.getHours();
    const buildDate = new Date(this.year, this.month, this.day, timer, minutes);
     this.timeFromInMl = buildDate.getTime();
  }

  onChangeTo(hours){
    const minutes = hours.getMinutes();
    const timer = hours.getHours();
    const buildDate = new Date(this.year, this.month, this.day, timer, minutes);
     this.timeToInMl = buildDate.getTime();
  }

  //  msToTime(duration) {
  //     var milliseconds = (duration%1000)/100
  //         , seconds = (duration/1000)%60
  //         , minutes = (duration/(1000*60))%60
  //         , hours = (duration / (1000*60*60) )%24;
  //
  //         hours = (hours < 10) ?  hours : hours;
  //      minutes = (minutes < 10) ?  minutes : minutes;
  //      seconds = (seconds < 10) ? seconds : seconds;
  //
  //     return minutes;
  // }
  //
  //
  //
  //  minutesToMilliseconds(minutes) {
  //   var millis = Math.floor(minutes * 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   return millis;
  // }

  onSelectDay(option){
    if(this.daysOfWeek.indexOf(option) > 0){
      this.selectedDay = option;
      this.showHours = true;
    }else{
      this.showHours = false;
    }
  }

  onSavingSchedule(){
    const element = this.myProfile.instructorSchedule.filter((el) => {
      if(el.day == this.daysOfWeek.indexOf(this.selectedDay)){
        el.workingHours.from = this.timeFromInMl
        el.workingHours.to = this.timeToInMl
        return el;
      }
    });

    if(!element[0]){
      if(this.timeFromInMl && this.timeToInMl){
        this.myProfile.instructorSchedule.push({
           day: this.daysOfWeek.indexOf(this.selectedDay),
           workingHours: {
             from: this.timeFromInMl,
             to: this.timeToInMl
           }
         });
      }
    }
    if(this.timeFromInMl !== undefined && this.timeToInMl !== undefined){
      this.instructorHttpService.editInstructorProfile(this.myProfile).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }
}
