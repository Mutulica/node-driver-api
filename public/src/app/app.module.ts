import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//MomentJs
import { MomentModule } from 'angular2-moment';
//Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeMaterialModule } from './home/home.material.module';
import { InstructorMaterialModule } from './instructor/instructor.material.module';

import { AppComponent } from './app.component';
//instructor Components
import { InstructorComponent } from './instructor/instructor.component';
import { StudentsListComponent } from './instructor/students-list/students-list.component';
import { ScheduleComponent } from './instructor/schedule/schedule.component';
import { StudentDetailsComponent } from './instructor/students-list/student-details/student-details.component';
//services
import { InstructorService } from './instructor/instructor.service';

import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';

const router = [
  {path: '', component: HomeComponent},
  {path: 'instructor', component: InstructorComponent, children: [
    {path: 'students', component: StudentsListComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'student-details/:id', component: StudentDetailsComponent}
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    InstructorComponent,
    HomeComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(router),
    BrowserAnimationsModule,
    HomeMaterialModule,
    InstructorMaterialModule
  ],
  providers: [
    InstructorService, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
