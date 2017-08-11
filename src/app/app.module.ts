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
import { ClientsComponent} from './client/clients.component';
import { ClientDetailComponent} from './client/client-detail.component';
import { ClientService} from './client/client.service';
import { OrderService} from './Order/order.service';
import { OrderDetailComponent} from './Order/order-detail.component';
import { OrdersComponent} from './Order/order.component';

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
    HeroesComponent,
    HeroSearchComponent,
    BrandsComponent,
    ClientsComponent,
    ClientDetailComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  providers: [HeroService,
    BrandService,
    ClientService,
    OrderService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

