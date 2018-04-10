import { Injectable, EventEmitter, Output} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from '../auth/auth.service';

@Injectable()

export class StudentHttpService{

   //private url = "https://driving-school-app.herokuapp.com";
   private url = "http://localhost:3000";

   @Output() public myProfile: EventEmitter<any> = new EventEmitter();
   //public myProfile = {};
   public instructorAppointments: EventEmitter<any> = new EventEmitter<any>();
   public loading = false;
   //Set token owner for getting the local storage token
   private tokenOwner: string = 'student';

  constructor(
    private http: Http,
    private authService: AuthService,
  ){

  }

  logout(){
    return this.http.delete(this.url + '/student/logout', this.authService.setHeaders(this.tokenOwner))
      .map(
        (res) => {
          return res.json();
        }
      ).catch(
        (err) => err || 'Server Error'
      )
  }

  getStudentProfile(){
    return this.http.get(this.url +'/student/me', this.authService.setHeaders(this.tokenOwner))
      .map(
        (res) => {
          this.loading = false;
          this.myProfile.emit(res.json());
          return res.json();
        }
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

  //Get Instructor Profile from Public Route
  getInstructorProfile(instructorId){
    return this.http.get(this.url +'/public/instructor/' + instructorId, this.authService.setHeaders(this.tokenOwner))
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
    return this.http.get(this.url +'/public/instructor-schedule/' + instructorId, this.authService.setHeaders(this.tokenOwner))
      .map(
        (res: Response) => {
        this.loading = false;
        this.instructorAppointments.emit(res.json());
        return  res.json()
        })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Next Appointments
  getNextAppointments(){
    return this.http.get(this.url +'/student/schedule/next', this.authService.setHeaders(this.tokenOwner))
      .map(
        (res) => res.json()
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }
//GET Appointments History
  getPastAppointments(){
    return this.http.get(this.url +'/student/schedule/past', this.authService.setHeaders(this.tokenOwner))
      .map(
        (res) => res.json()
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

  addAppointment(data){
    return this.http.post(this.url +'/student/schedule', data,this.authService.setHeaders(this.tokenOwner))
      .map(
        (res) => {
          this.loading = false;
          return res.json();
        }
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

}
