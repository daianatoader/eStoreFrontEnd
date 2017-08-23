import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import  { User } from '../user/user'

@Injectable()
export class AuthenticationService {
  private authUrl = 'http://localhost:8080/auth';
  private usersUrl = 'http://localhost:8080/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<boolean> {
    
    return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
    .map((response: Response) => { 
    console.log(response);
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error:any) => Observable.throw('Server error'));
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  create(user: User): Promise<User> {
    return this.http
        .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as User)
        .catch(this.handleError);
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
