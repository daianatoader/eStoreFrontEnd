import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {BrandsComponent} from './brand/brands.component';
import {BrandDetailComponent} from './brand/brand-detail.component';
import {AdminsComponent} from './admin/admin.component';
import {AdminDetailComponent} from './admin/admin-detail.component';
import {SectionsComponent} from './section/section.component';
import {SectionDetailComponent} from './section/section-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/brands', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'brandDetail/:id', component: BrandDetailComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'admins', component: AdminsComponent},
  {path: 'sections', component: SectionsComponent},
  {path: 'sectionDetail/:id', component: SectionDetailComponent},
  {path: 'adminDetail/:id', component: AdminDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
