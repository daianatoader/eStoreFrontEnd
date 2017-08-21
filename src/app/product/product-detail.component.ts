import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Product }        from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: [ './product-detail.component.css' ]
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
            .subscribe(product => this.product = product);
    }

    save(): void {
        this.productService.update(this.product)
           // .then(() => this.route.component);
    }

    goBack(): void {
        this.location.back();
    }
}

