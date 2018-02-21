import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StudentDetails } from './models/student-details.model';

import { UtilsService } from './utils/utils.service';

@Injectable()

export class InstructorHttpService {

  public studentsList: Object[] = [];
  public studentDetails: StudentDetails;
  public studentAppointments: Object[] = [];
  //public allAppointments: Object[] = [];
  //private url = "https://driving-school-app.herokuapp.com";
  private url = "http://localhost:3000";

  constructor(
    private http: Http,
    private utilsService: UtilsService
  ){}
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTgwNjkyMzEwYzJkYzBlNDhiYzAyNTAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTE4MzY0OTYzfQ.OOqiiw5CGLme05ASkKne6xM-pRnOS2gUfHSYlMvezao';

   headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'x-auth' : this.token
  });

   option: RequestOptions = new RequestOptions({
    headers: this.headers
  });

  registerStudent(data){
    return this.http.post(this.url + '/student',data ,this.option)
      .map((res: Response) =>{ this.studentsList.push(res.json())})
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  addAppointment(data){
    return this.http.post(this.url +'/instructor/schedule',data ,this.option)
      .map((res: Response) => {
        this.studentAppointments.push(res.json());
        this.studentAppointments = this.studentAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getStudents(){
    return this.http.get(this.url +'/student', this.option)
      .map((res: Response) => this.studentsList = res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getStudent(id){
    return this.http.get(this.url + '/student/' + id, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getAppointments(){
    return this.http.get(this.url +'/instructor/schedule', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  getUnconfirmedAppointments(){
    return this.http.get(this.url +'/instructor/schedule/unconfirmed', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  getStudentAppointments(id){
    return this.http.get(this.url +'/instructor/schedule/' + id, this.option)
      .map((res: Response) =>{
        this.studentAppointments = res.json();
        return this.studentAppointments;
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'))
  }

  //GET Instructor Details
  getInstructorDetails(){
    return this.http.get(this.url +'/instructor/me', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  deleteStudentAppointment(id){
    return this.http.delete(this.url +'/schedule/delete/' + id, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Reschedule appointment
  rescheduleStudentAppointment(data){
    return this.http.patch(this.url +'/schedule/reschedule', data, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
}
