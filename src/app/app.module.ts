import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';
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
    HeroesComponent,
    HeroSearchComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  providers: [HeroService,
    OrderService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

