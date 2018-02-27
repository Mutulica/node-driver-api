import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../../../shared/utils/utils.service';
import { StudentHttpService } from '../../studentHTTP.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  public myFilter = this.utilsService.myFilter;
  private date = new Date();
  public min = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1, 8);
  public max = new Date(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate() + 1, 18);
  //public selectedMoment = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 8);

  constructor(
    private studentHtpp: StudentHttpService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit() {
    console.log(this.date.getMonth(), this.date.getHours());
  }

  onChangeDate(date){
    if(date.value != undefined && date.value != ''){
      console.log(date);
      var data = {date: date.value.getTime()};
      this.studentHtpp.addAppointment(data)
        .subscribe(
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
