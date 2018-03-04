import { Component, OnInit} from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import {InstructorHttpService} from '../../instructorHTTP.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class InstructorCalendarComponent implements OnInit {

  public calendarOptions: Options;
  public appointments: Object[] = [
    {
      firstName: String,
      lastName: String
    }
  ];

  constructor(
    public instructorHttpService: InstructorHttpService
  ){}

  ngOnInit() {
    //GET instructor schedule
    this.instructorHttpService.getMyAppointments().subscribe(
      (res) => {
        this.appointments = res;
        //Add instructor schedule to Calendar events
        this.appointments.forEach((item, index) => {
          this.calendarOptions.events.push({
            title: item['firstName'] + ' ' + item['lastName'],
            start: new Date(item['date'].from),
            description: 'This is a cool event',
            allDay : false,
            color: "" //add color for events
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
    //Calendar Basic Options
     this.calendarOptions = {
        locale: "ro-RO",
        editable: true,
        navLinks: true,
        eventLimit: false,
        height: 650,
        contentHeight: 650,
        nowIndicator: true,
        buttonText : {
          today:    'Astazi',
          month:    'luna',
          week:     'saptamana',
          day:      'zi',
          list:     'lista'
        },
        displayEventTime: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        businessHours: {
          // days of week. an array of zero-based day of week integers (0=Sunday)
          dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

          start: '10:00', // a start time (10am in this example)
          end: '18:00', // an end time (6pm in this example)
      },
        events: this.appointments,
        timeFormat: 'H(:mm)'
      };
  }

  eventClick(event){
    console.log(event.event.title,event.event.start._d.getTime());
  }
}
