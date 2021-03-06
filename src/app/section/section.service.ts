import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Section} from './section';
import {AuthenticationService} from '../login/authentication.service';

@Injectable()
export class SectionService {
    private sectionsUrl = 'http://localhost:8080/sections';  // URL to web api

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      });
    constructor(private http: Http,
                private authenticationService: AuthenticationService) { }


    getSections(): Promise<Section[]> {
        return this.http.get(this.sectionsUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Section[])
            .catch(this.handleError);
    }


    getSection(id: number): Promise<Section> {
        const url = `${this.sectionsUrl}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Section)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.sectionsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Section> {
        return this.http
            .post(this.sectionsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Section)
            .catch(this.handleError);
    }

    update(section: Section): Promise<Section> {
        const url = `${this.sectionsUrl}/${section.id}`;
        var obj = {id: section.id, name: section.name};
        return this.http
            .put(url, JSON.stringify(obj), {headers: this.headers})
            .toPromise()
            .then(() => section)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}