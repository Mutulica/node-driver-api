import { Injectable, EventEmitter } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StudentDetails } from './models/student-details.model';

import { InstructorService } from './instructor.service';
import { UtilsService } from '../shared/utils/utils.service';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class InstructorHttpService {

  //public instructorProfile = new Subject<any>();;
  public studentsList: Object[] = [];
  public studentDetails: StudentDetails;
  public studentNextAppointments: Object[] = [];
  public studentPastAppointments: Object[] = [];

  //private url = "https://driving-school-app.herokuapp.com";
  private url = "http://localhost:3000";
  private tokenOwner: String;
  constructor(
    private http: Http,
    private authService: AuthService,
    private instructorService: InstructorService,
    private utilsService: UtilsService
  ){}


  //Logout
  logout(){
    return this.http.delete(this.url + '/instructor/logout', this.authService.setHeaders('instructor'))
      .map(
        (res) => {
          return res.json();
        }
      ).catch(
        (err) => err || 'Server Error'
      )
  }

  uploadProfileImage(image){
    return this.http.patch(this.url + '/instructor/image', image, this.authService.setHeaders('instructor'))
      .map((res: Response) =>{
        return res.json();
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  //GET Instructor Details
  getMyProfile(){
    return this.http.get(this.url + '/instructor/me', this.authService.setHeaders('instructor'))
      .map((res: Response) =>{
        this.instructorService.setProfile(res.json());
        return res.json();
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Edit Profile
  editInstructorProfile(data){
    return this.http.patch(this.url +'/instructor/me', data, this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Registre new student
  registerStudent(data){
    return this.http.post(this.url + '/student',data , this.authService.setHeaders('instructor'))
      .map((res: Response) =>{ this.studentsList.push(res.json())})
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Add appointment for student
  addAppointment(data){
    return this.http.post(this.url +'/instructor/schedule',data , this.authService.setHeaders('instructor'))
      .map((res: Response) => {
        //this.studentNextAppointments.push(res.json());
        this.instructorService.newAppoint.emit(res.json());
        //this.studentNextAppointments = this.studentNextAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Get Student incomplete appointments
  getStudentAppointments(id){
    return this.http.get(this.url +'/instructor/schedule/' + id, this.authService.setHeaders('instructor'))
      .map((res: Response) =>{
        this.studentNextAppointments = res.json();
        return this.studentNextAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'))
  }
  //Get Student Completed appointments
  getStudentCompletedAppointments(id){
    return this.http.get(this.url +'/instructor/sessions/history/' + id, this.authService.setHeaders('instructor'))
      .map((res: Response) =>{
        this.studentPastAppointments = res.json();
        return this.studentPastAppointments.sort(this.utilsService.orderDateDesc);
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'))
  }
  //Get all students
  getStudents(){
    return this.http.get(this.url +'/instructor/students', this.authService.setHeaders('instructor'))
      .map((res: Response) => {
        this.instructorService.setStudents(res.json());
        return res.json();
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Get one Student
  getStudent(id){
    return this.http.get(this.url + '/instructor/student/' + id, this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Instructor Future Appointments (With status incomplete)
  getMyAppointments(){
    return this.http.get(this.url +'/instructor/schedule', this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Instructor Appointments History (with completed status)
  getAppointmentsHistory(){
    return this.http.get(this.url +'/instructor/schedule/history', this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Get Unconfirmed Appointments
  getUnconfirmedAppointments(){
    return this.http.get(this.url +'/instructor/schedule/unconfirmed', this.authService.setHeaders('instructor'))
      .map((res: Response) => {
        this.instructorService.setUnconfirmedAppointments(res.json());
        return res.json()
      })
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  //Confirm Appointment
  confirmAppointment(appointment){
    return this.http.patch(this.url +'/instructor/schedule/confirm', appointment, this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }

  //Complete Appointment
  completeAppointment(appointment){
    return this.http.patch(this.url +'/instructor/schedule/complete', appointment, this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //GET Instructor Details
  getInstructorDetails(){
    return this.http.get(this.url +'/instructor/me', this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Delete an Appointment
  deleteStudentAppointment(id){
    return this.http.delete(this.url +'/instructor/schedule/delete/' + id, this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
  //Reschedule appointment
  rescheduleStudentAppointment(data){
    return this.http.patch(this.url +'/schedule/reschedule', data, this.authService.setHeaders('instructor'))
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error || 'Server Error!'));
  }
}
