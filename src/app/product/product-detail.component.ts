import 'rxjs/add/operator/switchMap';
import { Component, OnInit,ElementRef }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Response, Http } from '@angular/http';

import { Product }        from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: [ './product-detail.component.css' ]
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    private uploadUrl = 'http://localhost:8080/update';

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location,
        private el: ElementRef,
        private http: Http
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
            .subscribe(product => this.product = product);
    }

      upload() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            formData.append('photo', inputEl.files.item(0));
            this.http.post(this.uploadUrl, formData)
            .toPromise().then(this.informUser).catch(this.handleError);
          }
       }

  informUser(res: Response): void {
    alert('image ' + res.text() + ' successfully uploaded');
  }

  handleError(): void {
    alert('eroare');
  }

    save(): void {
        this.productService.update(this.product)
           // .then(() => this.route.component);
    }

    goBack(): void {
        this.location.back();
    }
}

