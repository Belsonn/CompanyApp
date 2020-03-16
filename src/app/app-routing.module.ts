import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: 'companies/:id', component: DetailsComponent},
  {path: 'companies', component: HomeComponent},
  {path: '', redirectTo: '/companies', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
