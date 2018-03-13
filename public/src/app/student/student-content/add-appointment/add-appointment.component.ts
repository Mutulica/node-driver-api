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
  public minDate = new Date();
  public schedule = [];
  private instructorAppoint = [];
  private scheduleIndex : number;
  public loading = true;
  public displayResult = false;
  public result = {
    message: '',
    status: '',
    from: null,
    to: null
  };

  public myFilter = this.utilsService.myFilter;
  public toggleSchedule = false;
  //public selectedMoment = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 8);

  constructor(
    private studentHttp: StudentHttpService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit() {
    this.studentHttp.getStudentProfile().subscribe(
      (res) => {
        this.profile = res;
        this.getInstructorAppointments(this.profile._instructorId);
        this.getInstructor(res._instructorId);
      }
    );

  }

  onSelectTime(i){
    this.scheduleIndex = i;
  }

  getInstructorAppointments(instructorId){
    this.studentHttp.getInstructorAppointments(instructorId)
      .subscribe(
        (res) => {
          this.instructorAppoint = res;
          setTimeout(() => {
            this.loading = false;
          }, 400);
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
    this.scheduleIndex = undefined;
    this.displayResult = false;
    this.loading = true;
    this.getInstructorAppointments(this.profile._instructorId);
    if(this.selectedMoment > this.minDate){
        this.schedule = this.utilsService.buildScheduleFromMS(this.workingSchedule, this.selectedMoment.getDay());
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

  onInputClick(){
    this.getInstructorAppointments(this.profile._instructorId);
    this.scheduleIndex = undefined;
    this.selectedMoment === undefined;
    this.toggleSchedule = false;
  }

  addNewAppointment(){
    this.loading = true;
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
        studentId: this.profile._id,
        date: {
          from: from,
          to: to
        }
      }

      this.studentHttp.addAppointment(data)
        .subscribe(
          (res) => {
            this.schedule.splice(this.scheduleIndex, 1);
            this.scheduleIndex = undefined;
            this.toggleSchedule = false;
            setTimeout(() => {
              this.loading = false;
            }, 400);
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
