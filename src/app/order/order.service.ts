import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Order } from './order';
import {AuthenticationService} from '../login/authentication.service';
import {Http,Headers} from '@angular/http';

@Injectable()
export class OrderService {
  private ordersUrl = 'http://localhost:8080/orders';
  private cartUrl = 'http://localhost:8080/cart';  // URL to web api // URL to web api
// URL to web api // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });
    constructor(private http: Http,
                private authenticationService: AuthenticationService) { }

  getOrders(): Promise<Order[]> {
    return this.http.get(this.ordersUrl, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }

  getOrder(id: number): Promise<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }

  getOpenOrderForUser(id: number): Promise<Order> {
    const url = `${this.cartUrl}/${id}`;
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }

  create(order: Order): Promise<Order> {
    return this.http
        .post(this.ordersUrl, JSON.stringify(order), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Order)
        .catch(this.handleError);
}
  update(order: Order): Promise<Order> {
    const url = `${this.ordersUrl}/${order.id}`;
    return this.http
        .put(url, JSON.stringify(order), {headers: this.headers})
        .toPromise()
        .then(() => order)
        .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
