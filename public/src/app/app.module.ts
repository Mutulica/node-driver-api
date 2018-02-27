import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
//instructor NgModule
import { InstructorModule} from './instructor/instructor.module';

import { StudentModule} from './student/student.module';

//shared services
import { UtilsService } from './shared/utils/utils.service';



const router = [
  {path: '', component: AppComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    InstructorModule,
    StudentModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(router)
  ],
  providers: [DatePipe, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
