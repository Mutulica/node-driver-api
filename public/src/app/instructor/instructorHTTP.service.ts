import { Injectable, EventEmitter } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StudentDetails } from './models/student-details.model';

import { UtilsService } from '../shared/utils/utils.service';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class InstructorHttpService {

  public studentsList: Object[] = [];
  public studentDetails: StudentDetails;
  public studentAppointments: Object[] = [];
  public myProfile: EventEmitter<any> = new EventEmitter<any>();
  // public instructorProfile = {};
  //public allAppointments: Object[] = [];
  //private url = "https://driving-school-app.herokuapp.com";
  private url = "http://localhost:3000";

  constructor(
    private http: Http,
    private authService: AuthService,
    //private instructorService: InstructorService,
    private utilsService: UtilsService
  ){}

  // add authorization header with jwt token
   headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'x-auth' : this.authService.token
  });

   option: RequestOptions = new RequestOptions({
    headers: this.headers
  });

  //GET Instructor Details
  getMyProfile(){
    return this.http.get(this.url + '/instructor/me', this.option)
      .map((res: Response) =>{
        // this.instructorProfile = res.json();
        this.myProfile.emit(res.json());
        return res.json();
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Edit Profile
  editInstructorProfile(data){
    return this.http.patch(this.url +'/instructor/me', data, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Registre new student
  registerStudent(data){
    return this.http.post(this.url + '/student',data ,this.option)
      .map((res: Response) =>{ this.studentsList.push(res.json())})
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Add appointment for student
  addAppointment(data){
    return this.http.post(this.url +'/instructor/schedule',data ,this.option)
      .map((res: Response) => {
        this.studentAppointments.push(res.json());
        this.studentAppointments = this.studentAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Get Student incomplete appointments
  getStudentAppointments(id){
    return this.http.get(this.url +'/instructor/schedule/' + id, this.option)
      .map((res: Response) =>{
        this.studentAppointments = res.json();
        return this.studentAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'))
  }
  //Get Student Completed appointments
  getStudentCompletedAppointments(id){
    return this.http.get(this.url +'/instructor/sessions/history/' + id, this.option)
      .map((res: Response) =>{
        this.studentAppointments = res.json();
        return this.studentAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'))
  }
  //Get all students
  getStudents(){
    return this.http.get(this.url +'/instructor/students', this.option)
      .map((res: Response) => this.studentsList = res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Get one Student
  getStudent(id){
    return this.http.get(this.url + '/instructor/student/' + id, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Instructor Future Appointments (With status incomplete)
  getMyAppointments(){
    return this.http.get(this.url +'/instructor/schedule', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Instructor Appointments History (with completed status)
  getAppointmentsHistory(){
    return this.http.get(this.url +'/instructor/schedule/history', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Get Unconfirmed Appointments
  getUnconfirmedAppointments(){
    return this.http.get(this.url +'/instructor/schedule/unconfirmed', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  //Confirm Appointment
  confirmAppointment(appointment){
    return this.http.patch(this.url +'/instructor/schedule/confirm', appointment, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  //Complete Appointment
  completeAppointment(appointment){
    return this.http.patch(this.url +'/instructor/schedule/complete', appointment, this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Instructor Details
  getInstructorDetails(){
    return this.http.get(this.url +'/instructor/me', this.option)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Delete an Appointment
  deleteStudentAppointment(id){
    return this.http.delete(this.url +'/instructor/schedule/delete/' + id, this.option)
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
