import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
// import { NgForm } from '@angular/forms';

import { DateTimeAdapter } from 'ng-pick-datetime';

import { InstructorService } from '../../../instructor.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  public selectedMoment ;
  private studentId = this.route.snapshot.params['id'];

  public myFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
  }

  constructor(
    private route: ActivatedRoute,
    public instructorService: InstructorService,
    private dateTimeAdapter: DateTimeAdapter<any>
  ) {
      dateTimeAdapter.setLocale('ro-RO');
  }

  ngOnInit() {
  }

  onChangeDate(){

    if(this.selectedMoment != undefined){
      var data = {studentId: this.studentId, date: this.selectedMoment.getTime()};
      this.instructorService.addAppointment(data)
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
