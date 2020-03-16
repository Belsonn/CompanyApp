import { Component, OnInit } from "@angular/core";
import { CompaniesService } from "./shared/companies.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private companiesService: CompaniesService) {}
  length: number;

  ngOnInit() {
    this.companiesService.fetchCompanies().subscribe(companiesAPI => {
      this.length = companiesAPI.length;
      for (const index of companiesAPI) {
        this.companiesService.fetchOneIncome(index).subscribe(companieOne => {
          this.companiesService.companies.push(companieOne);
          this.length--;
        });
      }
    });
  }
}
