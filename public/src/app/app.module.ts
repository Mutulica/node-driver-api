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

//Auth service
import {AuthService } from './auth/auth.service';

//shared services
import { UtilsService } from './shared/utils/utils.service';
import { InstructorLoginComponent } from './auth/instructor-login/instructor-login.component';
import { StudentLoginComponent } from './auth/student-login/student-login.component';



const router = [
  {path: '', component: AppComponent},
  {path: 'instructor-login', component: InstructorLoginComponent},
  {path: 'student-login', component: StudentLoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InstructorLoginComponent,
    StudentLoginComponent,
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
  providers: [DatePipe, UtilsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
