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
import {SectionsComponent} from './section/section.component';
import {SectionService} from './section/section.service';
import {SectionDetailComponent} from './section/section-detail.component';
import {ProductsComponent} from './product/products.component';
import {ProductService} from './product/product.service';
import {ProductDetailComponent} from './product/product-detail.component';
import {CampaignsComponent} from './campaign/campaigns.component';
import {CampaignService} from './campaign/campaign.service';
import {CampaignDetailComponent} from './campaign/campaign-detail.component';
import { OrderService} from './order/order.service';
import { OrderDetailComponent} from './order/order-detail.component';
import { OrdersComponent} from './order/order.component';
import {LoginComponent} from './login/login.component';
import {NewAccountComponent} from './login/new-account.component';
import {AuthenticationService} from './login/authentication.service';

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
    SectionDetailComponent,
    ProductDetailComponent,
    CampaignDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    BrandsComponent,
    SectionsComponent,
    ProductsComponent,
    CampaignsComponent,
    OrdersComponent,
    OrderDetailComponent,
    LoginComponent,
    NewAccountComponent
  ],
  providers: [
    HeroService,
    BrandService,
    SectionService,
    ProductService,
    CampaignService,
    OrderService,
    AuthenticationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

