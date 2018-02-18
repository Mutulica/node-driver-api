import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class InstructorService {

  public studentsList: Object[] = [];
  public studentDetails: Object = {};
  public studentAppointments: Object[] = [];
  //public allAppointments: Object[] = [];

  constructor(private http: Http){}
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTgwNjkyMzEwYzJkYzBlNDhiYzAyNTAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE4MzY0OTYzfQ.OOqiiw5CGLme05ASkKne6xM-pRnOS2gUfHSYlMvezao';

   headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'x-auth' : this.token
  });

   option: RequestOptions = new RequestOptions({
    headers: this.headers
  });

  registerStudent(data){
    return this.http.post('http://localhost:3000/student',data ,this.option)
      .map((res: Response) =>{ this.studentsList.push(res.json())})
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  addAppointment(data){
    return this.http.post('http://localhost:3000/instructor/schedule',data ,this.option)
      .map((res: Response) => this.studentAppointments.push(res.json()))
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getStudents(){
    return this.http.get('http://localhost:3000/student', this.option)
      .map((res: Response) => this.studentsList = res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getStudent(id){
    return this.http.get('http://localhost:3000/student/' + id, this.option)
      .map((res: Response) => this.studentDetails = res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getAppointments(){
    return this.http.get('http://localhost:3000/instructor/schedule', this.option)
      .map((res: Response) => {
        // this.allAppointments = res.json();
        // console.log(this.allAppointments);
        return res.json();
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getUnconfirmedAppointments(){
    return this.http.get('http://localhost:3000/instructor/schedule/unconfirmed', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  getStudentAppointments(id){
    return this.http.get('http://localhost:3000/instructor/schedule/' + id, this.option)
      .map((res: Response) =>{
        this.studentAppointments = res.json();
        return this.studentAppointments;
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'))
  }

  //GET Instructor Details
  getInstructorDetails(){
    return this.http.get('http://localhost:3000/instructor/me', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  deleteStudentAppointment(id){
    return this.http.delete('http://localhost:3000/schedule/delete/' + id, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
}
