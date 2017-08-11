import { Component }          from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1><img src="app/nttdata.png" align="middle"></h1>
    <nav>
     <!-- <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a> -->
     <!-- <a routerLink="/heroes" routerLinkActive="active">Heroes</a> -->
      <a routerLink="/brands" routerLinkActive="active">Brands</a>
      <a routerLink="/sections" routerLinkActive="active">Section</a>
      <a routerLink="/clients" routerLinkActive="active">Clients</a>
      <a routerLink="/admins" routerLinkActive="active">Admin</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eStore';
}
