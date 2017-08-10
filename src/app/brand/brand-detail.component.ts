import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Brand }        from './brand';
import { BrandService } from './brand.service';

@Component({
  selector: 'brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: [ './brand-detail.component.css' ]
})
export class BrandDetailComponent implements OnInit {
  brand: Brand;

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.brandService.getBrand(+params.get('id')))
      .subscribe(brand => this.brand = brand);
  }

  save(): void {
    this.brandService.update(this.brand)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}