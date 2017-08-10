import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Brand }                from './brand';
import { BrandService }         from './brand.service';

@Component({
  selector: 'my-brands',
  templateUrl: './brands.component.html',
  styleUrls: [ './brands.component.css' ]
})
export class BrandsComponent implements OnInit {
  brands: Brand[];
  selectedBrand: Brand;

  constructor(
    private brandService: BrandService,
    private router: Router) { }

  getBrands(): void {
    this.brandService
        .getBrands()
        .then(brands => this.brands = brands);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.brandService.create(name)
      .then(brand => {
        this.brands.push(brand);
        this.selectedBrand = null;
      });
  }
  delete(brand: Brand): void {
    this.brandService
        .delete(brand.id)
        .then(() => {
          this.brands = this.brands.filter(b => b !== brand);
          if (this.selectedBrand === brand) { this.selectedBrand = null; }
        });
  }
  onSelect(brand: Brand): void {
    this.selectedBrand = brand;
  }
  
   gotoDetail(): void {
    this.router.navigate(['/brandDetail', this.selectedBrand.id]);
  }

    ngOnInit(): void {
    this.getBrands();
  }
}