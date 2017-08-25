import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Product} from './product';
import {AuthenticationService} from '../login/authentication.service';

@Injectable()
export class ProductService {

    private productsUrl = 'http://localhost:8080/products';  // URL to web api

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      });
        constructor(private http: Http,
                    private authenticationService: AuthenticationService) { }

    getProducts(): Promise<Product[]> {
        return this.http.get(this.productsUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }


    getProduct(id: number): Promise<Product> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Product> {
        return this.http
            .post(this.productsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Product)
            .catch(this.handleError);
    }

    update(product: Product): Promise<Product> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http
            .put(url, JSON.stringify(product), {headers: this.headers})
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}


