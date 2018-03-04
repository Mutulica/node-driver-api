import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from '../auth/auth.service';

@Injectable()

export class StudentHttpService{


    headers: Headers = new Headers({
     'Content-Type': 'application/json',
     'x-auth' : this.authService.token
   });

    option: RequestOptions = new RequestOptions({
     headers: this.headers
   });
   private url = "https://driving-school-app.herokuapp.com";
   //private url = "http://localhost:3000";

   // public myProfile = {};
   public myProfile: EventEmitter<any> = new EventEmitter<any>();
   public instructorAppointments: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: Http,
    private authService: AuthService,
  ){}

  getStudentProfile(){
    return this.http.get(this.url +'/student/me', this.option)
      .map(
        (res) => {
          //this.myProfile.emit(res.json());
          //this.myProfile = res.json();
          return res.json();
        }
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

  //Get Instructor Profile from Public Route
  getInstructorProfile(instructorId){
    return this.http.get(this.url +'/public/instructor/' + instructorId, this.option)
      .map(
        (res) => {
          return res.json();
        }
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

  //Get all Instructor Appointments from public route
  getInstructorAppointments(instructorId){
    return this.http.get(this.url +'/public/instructor-schedule/' + instructorId, this.option)
      .map(
        (res: Response) => {
        this.instructorAppointments.emit(res.json());
        return  res.json()
        })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Next Appointments
  getNextAppointments(){
    return this.http.get(this.url +'/student/schedule/next', this.option)
      .map(
        (res) => res.json()
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }
//GET Appointments History
  getPastAppointments(){
    return this.http.get(this.url +'/student/schedule/past', this.option)
      .map(
        (res) => res.json()
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

  addAppointment(data){
    return this.http.post(this.url +'/student/schedule', data,this.option)
      .map(
        (res) => res.json()
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

}
