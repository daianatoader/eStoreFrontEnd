import {Component} from '@angular/core';

  @Component({
    selector: 'my-app',
    template: `      
      <h1><img src="app/nttdata.png" align="middle"></h1>
      <nav>
        <a routerLink="/brands" routerLinkActive="active">Brands</a>
        <a routerLink="/sections" routerLinkActive="active">Sections</a>
        <a routerLink="/clients" routerLinkActive="active">Clients</a>
        <a routerLink="/admins" routerLinkActive="active">Admins</a>
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/campaigns" routerLinkActive="active">Campaigns</a>
        <a routerLink="/orders" routerLinkActive="active">Orders</a>
        <h1><img src="app/cart.png" align="left"></h1>
        <a routerLink="/cart" routerLinkActive="active">Shopping Cart</a>
      </nav>
      <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css', './app.component.html']
  })

export class AppComponent {
  title = 'eStore';
}
