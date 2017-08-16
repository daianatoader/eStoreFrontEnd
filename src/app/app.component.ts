import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1><img src="app/nttdata.png" align="middle"></h1>
    <nav>
      <a routerLink="/brands" routerLinkActive="active">Brands</a>
      <a routerLink="/sections" routerLinkActive="active">Section</a>
      <a routerLink="/clients" routerLinkActive="active">Clients</a>
      <a routerLink="/admins" routerLinkActive="active">Admin</a>
      <a routerLink="/products" routerLinkActive="active">Products</a>
      <a routerLink="/campaigns" routerLinkActive="active">Campaigns</a>
      <a routerLink="/orders" routerLinkActive="active">Orders</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eStore';
}

