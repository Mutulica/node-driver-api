import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { StudentGuard } from '../auth/student.guard';

import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { StudentComponent } from './student.component';
import { StudentHeaderComponent } from './student-header/student-header.component';

import {StudentHttpService} from './studentHTTP.service';
import {StudentService} from './studentService.service';
import { StudentLeftNavComponent } from './student-left-nav/student-left-nav.component';
import { StudentContentComponent } from './student-content/student-content.component';
import { ScheduleListComponent } from './student-content/schedule-list/schedule-list.component';
import { AddAppointmentComponent } from './student-content/add-appointment/add-appointment.component';
import { StudentProfileComponent } from './student-content/student-profile/student-profile.component';
import { StudentProfileEditComponent } from './student-content/student-profile-edit/student-profile-edit.component';
import { StudentAppointmentsComponent } from './student-content/student-profile/student-appointments/student-appointments.component';
import { ScheduleHistoryComponent } from './student-content/schedule-history/schedule-history.component';
import { InstructorComponent } from './student-content/instructor/instructor.component';

const router = [
  {path: 'student', component: StudentComponent, canActivate: [StudentGuard], children: [
    {path: 'schedule', component: ScheduleListComponent, canActivate: [StudentGuard]},
    {path: 'add-appointment', component: AddAppointmentComponent, canActivate: [StudentGuard]},
    {path: 'profile', component: StudentProfileComponent, canActivate: [StudentGuard]},
    {path: 'edit-profile', component: StudentProfileEditComponent, canActivate: [StudentGuard]},
    {path: 'schedule-history', component: ScheduleHistoryComponent, canActivate: [StudentGuard]},
    {path: 'instructor', component: InstructorComponent, canActivate: [StudentGuard]}
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    RouterModule.forRoot(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    StudentComponent,
    StudentHeaderComponent,
    StudentLeftNavComponent,
    StudentContentComponent,
    ScheduleListComponent,
    AddAppointmentComponent,
    StudentProfileComponent,
    StudentProfileEditComponent,
    StudentAppointmentsComponent,
    ScheduleHistoryComponent,
    InstructorComponent
  ],
  providers: [
    StudentHttpService, StudentService, StudentGuard, {provide: OWL_DATE_TIME_LOCALE, useValue: 'ro'}
  ]
})

export class StudentModule { }
