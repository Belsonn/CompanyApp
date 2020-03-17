import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { HomeComponent } from "./home/home.component";
import { DataLoadedGuard } from './shared/dataLoadedGuard.service';

const routes: Routes = [
  {
    path: "companies/:id",
    component: DetailsComponent,
    canActivate: [DataLoadedGuard]
  },
  { path: "companies", component: HomeComponent },
  { path: "", redirectTo: "/companies", pathMatch: "prefix" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
