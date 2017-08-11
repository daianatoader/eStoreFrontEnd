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
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('photo', inputEl.files.item(0));
            //call the angular http method
            this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(this.uploadUrl, formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success._body);
                },
                (error) => alert(error))
          }
       }
  save(): void {
    this.brandService.update(this.brand)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}