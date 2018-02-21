import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule  } from 'ng-fullcalendar';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { InstructorComponent } from './instructor.component';
import { InstructorHeaderComponent } from './instructor-header/instructor-header.component';
import { InstructorLeftNavComponent } from './instructor-left-nav/instructor-left-nav.component';
import { InstructorContentComponent } from './instructor-content/instructor-content.component';
import { InstructorCalendarComponent } from './instructor-content/calendar/calendar.component';
import { ScheduleListComponent } from './instructor-content/schedule-list/schedule-list.component';
import { InstructorControlSidebarComponent } from './instructor-control-sidebar/instructor-control-sidebar.component';
import { StarterFooterComponent } from './starter-footer/starter-footer.component';
import { StudentsComponent } from './instructor-content/students/students.component';
import { AddStudentComponent } from './instructor-content/add-student/add-student.component';
import { StudentProfileComponent } from './instructor-content/student-profile/student-profile.component';
import { StudentAppointmentsComponent } from './instructor-content/student-profile/student-appointments/student-appointments.component';
import { AddAppointmentComponent } from './instructor-content/student-profile/add-appointment/add-appointment.component';
import { StudentPastSessionsComponent } from './instructor-content/student-profile/student-past-sessions/student-past-sessions.component';

const router = [
  {path: 'instructor', component: InstructorComponent, children: [
    {path: 'calendar', component: InstructorCalendarComponent},
    {path: 'schedule-list', component: ScheduleListComponent},
    {path: 'students', component: StudentsComponent},
    {path: 'students/:id', component: StudentProfileComponent},
    {path: 'new-student', component: AddStudentComponent}
  ]}

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    RouterModule.forRoot(router),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    RouterModule,
    FullCalendarModule
],
  declarations: [
    InstructorComponent,
    StarterFooterComponent,
    InstructorHeaderComponent,
    InstructorLeftNavComponent,
    InstructorContentComponent,
    InstructorCalendarComponent,
    ScheduleListComponent,
    InstructorControlSidebarComponent,
    StudentsComponent,
    AddStudentComponent,
    StudentProfileComponent,
    StudentAppointmentsComponent,
    AddAppointmentComponent,
    StudentPastSessionsComponent
  ]

})
export class InstructorModule { }
