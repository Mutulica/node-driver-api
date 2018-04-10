import {Http, Response, Headers} from '@angular/http';
import { Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class AuthService{
  //private url = "https://driving-school-app.herokuapp.com";
  private url = "http://localhost:3000";
  public instructorToken: String;
  public studentToken: string;

  constructor(
    private http: Http
  ){
    // var instructor = JSON.parse(localStorage.getItem('instructor'));
    // var student = JSON.parse(localStorage.getItem('student'));
    //     this.instructorToken = instructor && instructor.token;
    //     this.studentToken = student && student.token;
  }

  instructorLogin(creditals){
    return this.http.post(this.url + '/instructor/login', creditals)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        const user = response.json() && response.json().user;
        if (token) {
            this.storeUserData(token, user, 'instructor');
            // return true to indicate successful login
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
      })
      .catch((err) => Observable.throw('Error'));
  }

  studentLogin(creditals){
    return this.http.post(this.url + '/student/login', creditals)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        const user = response.json().student;
        if (token) {
            this.storeUserData(token, user, 'student');
            // return true to indicate successful login
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
      })
      .catch((err) => Observable.throw('Error'));
  }

  storeUserData(token, user, owner){
    // set token property]
    if(owner === 'student'){
      this.studentToken = token;
    }else if(owner ==='instructor'){
      this.instructorToken = token;
    }
    // store username and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem(`${owner}_token`, token);
    localStorage.setItem(owner, JSON.stringify(user));
  }

  setHeaders(owner){
    let headers = new Headers();
    let tokenOwner = owner;
    headers.append('Content-Type', 'application/json');
    headers.append('x-auth', localStorage.getItem(`${tokenOwner}_token`));
    return {
      headers: headers
    };
  }
}
