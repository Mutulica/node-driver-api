import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { DateTimeAdapter } from 'ng-pick-datetime';

//import { ScheduleModel } from '../../../models/schedule.model';

import { InstructorService } from '../../../instructor.service';
import { InstructorHttpService } from '../../../instructorHTTP.service';
import { UtilsService } from '../../../../shared/utils/utils.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  public selectedMoment = new Date();
  public minDate = new Date();
  private studentId = this.route.snapshot.params['id'];
  public schedule;
  private instructorSchedule = [];
  private instructorAppoint = [];
  private scheduleIndex : number;

  public displayResult = false;
  public result = {
    message: '',
    status: '',
    from: null,
    to: null
  };

  public myFilter = this.utilsService.myFilter;
  public toggleSchedule = false;

  constructor(
    private route: ActivatedRoute,
    public instructorService: InstructorService,
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
      },
      err => console.log(err)
    );
  }

  onInputClick(){
    this.getInstructorAppointments();
    this.toggleSchedule = false;
    this.scheduleIndex = undefined;
    this.selectedMoment === undefined
  }

  getInstructorAppointments(){
    this.instructorHttpService.getMyAppointments().subscribe(
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
    if(this.selectedMoment){
      this.getInstructorAppointments();
      this.schedule = this.utilsService.buildScheduleFromMS(this.instructorSchedule, this.selectedMoment.getDay());
      if(this.schedule){
        var someArr = this.schedule.filter((element) => {
          for(let i = 0; i < this.instructorAppoint.length; i++){
            const fromDate = this.selectedMoment.setHours(
              new Date(element.from).getHours(), new Date(element.from).getMinutes()
            );
            if(fromDate == this.instructorAppoint[i].date.from){
              return element;
            }
          }
        });
        this.schedule = this.schedule.filter(val => !someArr.includes(val));
        this.toggleSchedule = true;
      }

    }
  }

  addNewAppointment(){
    const scheduleFrom = this.schedule[this.scheduleIndex].from;
    const scheduleTo = this.schedule[this.scheduleIndex].to;
    if(this.selectedMoment != undefined){
      const from = new Date(
        this.selectedMoment.setHours(
          new Date(scheduleFrom).getHours(), new Date(scheduleFrom).getMinutes()
      )).getTime();
      const to = new Date(
        this.selectedMoment.setHours(
          new Date(scheduleTo).getHours(), new Date(scheduleTo).getMinutes()
      )).getTime();
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
            this.schedule.splice(this.scheduleIndex, 1);
            this.scheduleIndex = undefined;
            this.toggleSchedule = false;
            this.displayResult = true;
            this.result.message = "Solicitarea a fost trimisa!";
            this.result.status = "success";
            this.result.from = res.date.from;
            this.result.to = res.date.to;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
