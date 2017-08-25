import { Injectable}    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Brand } from './brand'
import {AuthenticationService} from "../login/authentication.service";

@Injectable()
export class BrandService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });
  private brandsUrl = 'http://localhost:8080/brands';  // URL to web api



  constructor(private http: Http,
              private authenticationService: AuthenticationService) { }

  getBrands(): Promise<Brand[]> {
    return this.http.get(this.brandsUrl,  {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Brand[])
               .catch(this.handleError);
  }

   getBrand(id: number): Promise<Brand> {
    const url = `${this.brandsUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Brand)
      .catch(this.handleError);
  }

   delete(id: number): Promise<void> {
    const url = `${this.brandsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Brand> {
    return this.http
      .post(this.brandsUrl, JSON.stringify({name:name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Brand)
      .catch(this.handleError);
  }

  update(brand: Brand): Promise<Brand> {
    const url = `${this.brandsUrl}/${brand.id}`;
    var obj = {id: brand.id,name:brand.name,description:brand.description};
    console.log(obj);
    return this.http
      .put(url, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(() => brand)
      .catch(this.handleError);
  }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
  }
}
