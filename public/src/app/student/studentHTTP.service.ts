import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class StudentHttpService{

    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg0MGJlOWMzZmM1YzBiOTBkOTEzMWQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE4NjA0OTcxfQ.Xa7wjSQKK0sRsEavB_wZcgZdBQwzNTAY5sX5mX5to1g';

    headers: Headers = new Headers({
     'Content-Type': 'application/json',
     'x-auth' : this.token
   });

    option: RequestOptions = new RequestOptions({
     headers: this.headers
   });
   // private url = "https://driving-school-app.herokuapp.com";
   private url = "http://localhost:3000";

   public myProfile = {};

  constructor(private http: Http){}

  getStudentProfile(){
    return this.http.get(this.url +'/student/me', this.option)
      .map(
        (res) => {
          this.myProfile = res.json();
          return res.json();
        }
      )
      .catch(
        (err) => err || 'Server Error!'
      )
  }

  getStudentAppointments(){
    return this.http.get(this.url +'/schedule/me', this.option)
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
