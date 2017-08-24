import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {Order} from './order';
import {Http, Headers} from '@angular/http';

@Injectable()
export class OrderService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private ordersUrl = 'http://localhost:8080/orders';  // URL to web api // URL to web api
  private cartUrl = 'http://localhost:8080/cart';  // URL to web api // URL to web api

  constructor(private http: Http) {
  }

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

  getOpenOrderForClient(id: number): Promise<Order> {
    const url = `${this.cartUrl}/${id}`;
    console.log('ajunge aici');
    console.log(url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }

  update(id: number): Promise<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http
      .put(url, {headers: this.headers})
      .toPromise()
      .then(() => this.getOrder(id))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

