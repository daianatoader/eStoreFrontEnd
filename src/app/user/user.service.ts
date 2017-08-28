import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';
import {AuthenticationService} from "../login/authentication.service";

@Injectable()
export class UserService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

    private usersUrl = 'http://localhost:8080/users';  // URL to web api // URL to web api
    private userUrl = 'http://localhost:8080/user';  // URL to web api // URL to web api

    constructor(private http: Http,private authenticationService: AuthenticationService) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as User[])
            .catch(this.handleError);
    }
    getUser(id: number): Promise<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(username: string): Promise<User> {
        return this.http
            .post(this.usersUrl, JSON.stringify({username: username}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as User)
            .catch(this.handleError);
    }
    update(client: User): Promise<User> {
        const url = `${this.usersUrl}/${client.id}`;
        const obj = {id: client.id, username: client.username, password: client.password, firstName: client.firstName, lastName: client.lastName, email: client.email, phone: client.phone, address: client.address, cardNumber: client.cardNumber};
        return this.http
            .put(url, JSON.stringify(obj), {headers: this.headers})
            .toPromise()
            .then(() => client)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getLoggedInUser(): User {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var username = currentUser && currentUser.username;
        var currentUser ;
      const url = `${this.userUrl}/${username}`;
      this.http.get(url, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as User).then(u => currentUser = u)
        .catch(this.handleError);
      console.log("Current user " + currentUser);
      return currentUser;
    }
}

