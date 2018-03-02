import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../shared/utils/utils.service';
import { StudentHttpService } from '../../studentHTTP.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  private profile;
  public workingSchedule;
  public selectedMoment;
  public schedule = [];
  private instructorAppoint = [];
  private scheduleIndex : number;

  public myFilter = this.utilsService.myFilter;
  public toggleSchedule = false;
  //public selectedMoment = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 8);

  constructor(
    private studentHttp: StudentHttpService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit() {
    this.studentHttp.myProfile.subscribe(
      (res) => {
        this.profile = res;
        this.getInstructor(res._instructorId);
      }
    );
    // this.studentHttp.instructorAppointments.subscribe(
    //   (res) => {
    //     this.instructorAppoint = res;
    //   }
    // );
  }

  onSelectTime(i){
    this.scheduleIndex = i;
  }

  getInstructorAppointments(instructorId){
    this.studentHttp.getInstructorAppointments(instructorId)
      .subscribe(
        (res) => {
          this.instructorAppoint = res;
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  getInstructor(instructorId){
    this.studentHttp.getInstructorProfile(instructorId)
      .subscribe(
        (res) => {
          this.workingSchedule = res.instructorSchedule;
        }
      );
  }

  onInputFocus(){
    if(this.selectedMoment){
      this.schedule = this.utilsService.buildSchedule(this.workingSchedule, this.selectedMoment.getDay());
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

  onInputClick(input){
    this.getInstructorAppointments(this.profile._instructorId);
    this.scheduleIndex = undefined;
    this.selectedMoment === undefined
    this.toggleSchedule = false;

  }

  addNewAppointment(){
    if(this.selectedMoment != undefined){
      const from = this.utilsService.appendDateTime(this.selectedMoment.getTime(), this.schedule[this.scheduleIndex].from);
      const to = this.utilsService.appendDateTime(this.selectedMoment.getTime(), this.schedule[this.scheduleIndex].to);
      var data = {
        studentId: this.profile._id,
        date: {
          from: from,
          to: to
        }
      }

      this.studentHttp.addAppointment(data)
        .subscribe(
          (res) => {
            this.scheduleIndex = undefined;
            this.toggleSchedule = false;
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

}
