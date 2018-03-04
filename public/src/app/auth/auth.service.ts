import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class AuthService{
  //private url = "https://driving-school-app.herokuapp.com";
  private url = "http://localhost:3000";
  public token: string;

  constructor(private http: Http){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
  }

 //  headers: Headers = new Headers({
 //   'Content-Type': 'application/json',
 //   'x-auth' : this.token
 // });
 //
 //  option: RequestOptions = new RequestOptions({
 //   headers: this.headers
 // });

  instructorLogin(creditals){
    return this.http.post(this.url + '/instructor/login', creditals)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: creditals.email, token: token }));

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
        let token = response.json() && response.json().token;
        if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: creditals.email, token: token }));

            // return true to indicate successful login
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
      })
      .catch((err) => Observable.throw('Error'));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
      // return this.http.delete(this.url + '/instructor/logout', this.option)
      //  .map(
      //    (response: Response) => {
      //      return response;
      //    }
      //  )
      //  .catch((err) => err.json());
      // clear token remove user from local storage to log user out

    }
}
