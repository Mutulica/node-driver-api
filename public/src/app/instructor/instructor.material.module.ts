import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ScheduleComponent } from './schedule/schedule.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { NewStudentComponent } from './students-list/new-student/new-student.component';
import { StudentDetailsComponent } from './students-list/student-details/student-details.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
],
  declarations: [ScheduleComponent, StudentsListComponent, NewStudentComponent, StudentDetailsComponent],

})
export class InstructorMaterialModule { }
