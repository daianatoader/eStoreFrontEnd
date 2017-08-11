import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { BrandsComponent }      from './brand/brands.component';
import { BrandService }      from './brand/brand.service';
import { HeroDetailComponent }  from './hero-detail.component';
import { BrandDetailComponent }  from './brand/brand-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';
import {AdminsComponent} from './admin/admin.component';
import {AdminService} from './admin/admin.service';
import {AdminDetailComponent} from './admin/admin-detail.component';
import {SectionsComponent} from './section/section.component';
import {SectionService} from './section/section.service';
import {SectionDetailComponent} from './section/section-detail.component';
import { ClientsComponent} from './client/clients.component';
import { ClientDetailComponent} from './client/client-detail.component';
import {ClientService} from './client/client.service';
import {ProductsComponent} from './product/products.component';
import {ProductService} from './product/product.service';
import {ProductDetailComponent} from './product/product-detail.component';
import {CampaignsComponent} from './campaign/campaigns.component';
import {CampaignService} from './campaign/campaign.service';
import {CampaignDetailComponent} from './campaign/campaign-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    BrandDetailComponent,
    AdminDetailComponent,
    SectionDetailComponent,
    ClientDetailComponent,
    ProductDetailComponent,
    CampaignDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    BrandsComponent,
    AdminsComponent,
    SectionsComponent,
    ClientsComponent,
    ProductsComponent,
    CampaignsComponent
  ],
  providers: [
    HeroService,
    BrandService,
    AdminService,
    SectionService,
    ClientService,
    ProductService,
    CampaignService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
