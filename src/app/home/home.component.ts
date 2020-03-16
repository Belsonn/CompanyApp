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

  ngOnInit() {
    if(!(this.companiesService.companies.length > 0)){
      this.companiesService.fetchCompanies().subscribe(companiesAPI => {
        this.length = companiesAPI.length;
        for (const index of companiesAPI) {
          this.companiesService.fetchOneIncome(index).subscribe(companieOne => {
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
