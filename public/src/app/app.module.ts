import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';

import { AppComponent } from './app.component';
//instructor NgModule
import { InstructorModule} from './instructor/instructor.module';

//Instructor services
import { InstructorHttpService } from './instructor/instructorHTTP.service';
import { InstructorService } from './instructor/instructor.service';
import {UtilsService } from './instructor/utils/utils.service';

const router = [
  {path: '', component: AppComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InstructorModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(router)
  ],
  providers: [DatePipe, InstructorHttpService, InstructorService, UtilsService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
