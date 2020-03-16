import { Component, OnInit } from "@angular/core";
import { CompaniesService } from "./shared/companies.service";
import { Companies } from "./shared/companies.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  companies: Companies[] = [];
  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {
    this.companiesService.fetchCompanies().subscribe(companies => {
      this.companiesService.lenght = companies.length;
      this.companiesService.fetchIncome(companies);
    });
  }

  onGet() {
    this.companiesService.calcIncome();
  }
  onIncome() {
    if (this.companiesService.lenght < 1) {
      console.log(this.companiesService.companies);
    }
  }
}
