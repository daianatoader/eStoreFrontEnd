import { Injectable }    from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Order } from './order';
import {Http} from '@angular/http';

@Injectable()
export class OrderService {
  private ordersUrl = 'http://localhost:8080/orders';  // URL to web api // URL to web api

    constructor(private http: Http) { }

    getOrders(): Promise<Order[]> {
        return this.http.get(this.ordersUrl)
            .toPromise()
            .then(response => response.json() as Order[])
            .catch(this.handleError);
    }
    getOrder(id: number): Promise<Order> {
        const url = `${this.ordersUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Order)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

