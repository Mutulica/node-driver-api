import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
//instructor NgModule
import { InstructorModule} from './instructor/instructor.module';

//Instructor services
import { InstructorService } from './instructor/instructor.service';

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
  providers: [DatePipe, InstructorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
