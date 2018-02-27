import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { DateTimeAdapter } from 'ng-pick-datetime';

import { InstructorHttpService } from '../../../instructorHTTP.service';
import { UtilsService } from '../../../../shared/utils/utils.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  public selectedMoment;
  private studentId = this.route.snapshot.params['id'];
  public schedule = [];
  private instructorSchedule = [];
  private instructorAppoint = [];
  private scheduleIndex : number;

  public myFilter = this.utilsService.myFilter;
  public toggleSchedule = false;

  constructor(
    private route: ActivatedRoute,
    public instructorHttpService: InstructorHttpService,
    public utilsService: UtilsService,
    private dateTimeAdapter: DateTimeAdapter<any>
  ) {
      dateTimeAdapter.setLocale('ro-RO');
  }

  ngOnInit() {

    this.instructorHttpService.getMyProfile().subscribe(
      (res) => {
        this.instructorSchedule = res.instructorSchedule;
      }
    );

    this.instructorHttpService.getAppointments().subscribe(
      (res) => {
        this.instructorAppoint = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelectTime(i){
    this.scheduleIndex = i;
  }

  onInputChange(input){
    this.scheduleIndex = undefined;
    if(this.selectedMoment){
      this.schedule = this.utilsService.buildSchedule(this.instructorSchedule, this.selectedMoment.getDay());
      var someArr = this.schedule.filter((element, index)=>{
        for(let i = 0; i < this.instructorAppoint.length; i++){
          const fromDate = this.utilsService.appendDateTime(this.selectedMoment.getTime(), element.from);
          if(fromDate === this.instructorAppoint[i].date.from){
            return element;
          }
        }
      });
      this.schedule = this.schedule.filter(val => !someArr.includes(val));
      this.toggleSchedule = true;
    }
  }

  addNewAppointment(){
    if(this.selectedMoment != undefined){
      const from = this.utilsService.appendDateTime(this.selectedMoment.getTime(), this.schedule[this.scheduleIndex].from);
      const to = this.utilsService.appendDateTime(this.selectedMoment.getTime(), this.schedule[this.scheduleIndex].to);
      var data = {
        studentId: this.studentId,
        date: {
          from: from,
          to: to
        }
      }

      this.instructorHttpService.addAppointment(data)
        .subscribe(
          (res) => {
            this.scheduleIndex = undefined;
            this.toggleSchedule = false;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
