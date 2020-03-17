import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { DetailsComponent } from "./details/details.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { DataLoadedGuard } from './shared/dataLoadedGuard.service';


@NgModule({
  declarations: [AppComponent, DataTableComponent, DetailsComponent, LoadingSpinnerComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [DataLoadedGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
