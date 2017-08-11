import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { BrandsComponent }      from './brand/brands.component';
import { BrandDetailComponent }      from './brand/brand-detail.component';
import { ClientsComponent} from './client/clients.component';
import { ClientDetailComponent} from './client/client-detail.component';
import { OrdersComponent} from './Order/order.component';
import { OrderDetailComponent} from './Order/order-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/brands', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'brandDetail/:id', component: BrandDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'brands',     component: BrandsComponent },
  { path: 'clients', component: ClientsComponent},
  { path: 'clientDetail/:id', component: ClientDetailComponent },
  { path: 'orderDetail/:id', component: OrderDetailComponent},
  { path: 'orders', component: OrdersComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

