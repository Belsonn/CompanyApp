import { Component, OnInit } from "@angular/core";
import { CompaniesService } from '../shared/companies.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private companiesService: CompaniesService) {}
  length: number;
  error: Error

  // it has length property for check if data is already here and use ngIf properly
  // it calculates Total Income because its needed for this view
  // subscring all companies and for each one subscribing to get incomes for this single company

  ngOnInit() {
    if(!(this.companiesService.companies.length > 0)){
      this.companiesService.fetchCompanies().subscribe(companiesAPI => {
        this.length = companiesAPI.length;
        for (const index of companiesAPI) {
          this.companiesService.fetchOneIncome(index).subscribe(companieOne => {
            companieOne.calcTotalIncome();
            this.companiesService.companies.push(companieOne);
            this.length--;
          });
        }
      });
    } else {
      this.length = 0;
    }
  }
}
