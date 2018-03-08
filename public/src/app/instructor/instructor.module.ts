import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder} from '@angular/forms';

import { FullCalendarModule  } from 'ng-fullcalendar';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

//Auth Guard
import { AuthGuard } from '../auth/auth.guard';

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
import { InstructorProfileComponent } from './instructor-content/instructor-profile/instructor-profile.component';
import { InstructorProfileEditComponent } from './instructor-content/instructor-profile-edit/instructor-profile-edit.component';
import { DashboardComponent } from './instructor-content/dashboard/dashboard.component';
import { ScheduleUnconfirmedComponent } from './instructor-content/schedule-unconfirmed/schedule-unconfirmed.component';
import { ScheduleHistoryComponent } from './instructor-content/schedule-history/schedule-history.component';

//Instructor services
import { InstructorHttpService } from './instructorHTTP.service';
import { InstructorService } from './instructor.service';
import { EditScheduleComponent } from './instructor-content/instructor-profile-edit/edit-schedule/edit-schedule.component';




const router = [
  {path: 'instructor', component: InstructorComponent, canActivate: [AuthGuard], children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'calendar', component: InstructorCalendarComponent},
    {path: 'schedule-list', component: ScheduleListComponent},
    {path: 'schedule-unconfirmed', component: ScheduleUnconfirmedComponent},
    {path: 'schedule-history', component: ScheduleHistoryComponent},
    {path: 'students', component: StudentsComponent},
    {path: 'students/:id', component: StudentProfileComponent},
    {path: 'new-student', component: AddStudentComponent},
    {path: 'profile', component: InstructorProfileComponent},
    {path: 'edit', component: InstructorProfileEditComponent}
  ]},

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
    StudentPastSessionsComponent,
    InstructorProfileComponent,
    InstructorProfileEditComponent,
    DashboardComponent,
    ScheduleUnconfirmedComponent,
    ScheduleHistoryComponent,
    EditScheduleComponent
  ],
  providers: [
    AuthGuard,
    InstructorHttpService,
    InstructorService,
    FormBuilder
  ]

})
export class InstructorModule { }
