import 'rxjs/add/operator/switchMap';
import { Component, OnInit,ElementRef }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Response, Http } from '@angular/http';

import { Brand }        from './brand';
import { BrandService } from './brand.service';

@Component({
  selector: 'brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: [ './brand-detail.component.css' ]
})
export class BrandDetailComponent implements OnInit {
  brand: Brand;
  private uploadUrl = 'http://localhost:8080/update';

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private location: Location,
    private el: ElementRef,
    private http: Http
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.brandService.getBrand(+params.get('id')))
      .subscribe(brand => this.brand = brand);

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
    this.brandService.update(this.brand)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
