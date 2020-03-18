import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Companies } from "../shared/companies.model";
import { CompaniesService } from "../shared/companies.service";
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  company: Companies; // stores selected company Object
  startDate = new Date(); // Dates for select in view
  endDate = new Date();
  constructor(
    private route: ActivatedRoute,
    private companiesService: CompaniesService,
    private adapter : DateAdapter<any>
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"]; // gets id from params
    this.company = this.companiesService.companies.find(el => id == el.id); // gets company with id
    this.company.calcAverageIncome(); // performs calculations on object
    this.company.calcLastMonthIncome();
    this.calcStartDate(); // it makes this Date to be on 1 day of last Month
    this.endDate.setDate(0); // it makes this Date to be on last day of Last Month
    this.company.calcSelected(this.startDate, this.endDate); // calcs both avg and total incomes in given time
    this.adapter.setLocale('pl'); // sets date in DatePicker looks like in Poland
  }

  calcStartDate() {
    // Checks if this month is January, if it is, makes it December the previous year
    if (this.startDate.getMonth() == 0){
      this.startDate.setMonth(11);
      this.startDate.setFullYear(this.startDate.getFullYear() - 1);
      this.startDate.setDate(1);
    }
    else{
      this.startDate.setMonth(this.startDate.getMonth() - 1)
      this.startDate.setDate(1);
    }
  }
  // changes data here if user changed it, calculating the data again
  updateValueEnd(date) {
    this.endDate = date.value;
    this.company.calcSelected(this.startDate, this.endDate);
  }
  // changes data here if user changed it, calculating the data again
  updateValueStart(date) {
    this.startDate = date.value;
    this.company.calcSelected(this.startDate, this.endDate);
  }

}
