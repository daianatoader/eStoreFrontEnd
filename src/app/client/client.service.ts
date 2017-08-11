import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Client } from './client';

@Injectable()
export class ClientService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private clientsUrl = 'http://localhost:8080/clients';  // URL to web api // URL to web api

    constructor(private http: Http) { }

    getClients(): Promise<Client[]> {
        return this.http.get(this.clientsUrl)
            .toPromise()
            .then(response => response.json() as Client[])
            .catch(this.handleError);
    }
    getClient(id: number): Promise<Client> {
        const url = `${this.clientsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Client)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.clientsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(username: string): Promise<Client> {
        return this.http
            .post(this.clientsUrl, JSON.stringify({username: username}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Client)
            .catch(this.handleError);
    }
    update(client: Client): Promise<Client> {
        const url = `${this.clientsUrl}/${client.id}`;
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
}

