import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Companies } from "../shared/companies.model";
import { CompaniesService } from "../shared/companies.service";
import { Income } from '../shared/income.model';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  company: Companies;
  averageIncome: number = 0;
  lastMonthIncome: number = 0;
  constructor(
    private route: ActivatedRoute,
    private companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.company = this.companiesService.companies.find(el => id == el.id);
    this.calcAverageIncome(this.company);
    this.calcLastMonthIncome(this.company);
  }

  calcAverageIncome(company: Companies) {
    this.averageIncome = company.totalIncome / company.incomes.length;
  }
  calcLastMonthIncome(company: Companies) {
    let date = new Date();
    if(date.getMonth() == 0){
      date.setMonth(11)
      date.setFullYear(date.getFullYear() - 1); 
    }
    else {
      date.setMonth(date.getMonth() - 1);
    }
    for(const index of company.incomes){
      if(index.date.getMonth() == date.getMonth() && index.date.getFullYear() == date.getFullYear()) {
        this.lastMonthIncome += +index.value;
      }
    }
  }
}
