import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Admin} from './admin';

@Injectable()
export class AdminService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private adminsUrl = 'http://localhost:8080/admins';  // URL to web api

    constructor(private http: Http) {
    }

    getAdmins(): Promise<Admin[]> {
        return this.http.get(this.adminsUrl)
            .toPromise()
            .then(response => response.json() as Admin[])
            .catch(this.handleError);
    }


    getAdmin(id: number): Promise<Admin> {
        const url = `${this.adminsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Admin)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.adminsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Admin> {
        return this.http
            .post(this.adminsUrl, JSON.stringify({username: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Admin)
            .catch(this.handleError);
    }

    update(admin: Admin): Promise<Admin> {
        const url = `${this.adminsUrl}/${admin.id}`;
        var obj = {id: admin.id, username: admin.username};
        return this.http
            .put(url, JSON.stringify(obj), {headers: this.headers})
            .toPromise()
            .then(() => admin)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}