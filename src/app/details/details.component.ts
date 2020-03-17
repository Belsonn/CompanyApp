import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Companies } from "../shared/companies.model";
import { CompaniesService } from "../shared/companies.service";
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  company: Companies;
  startDate = new Date();
  endDate = new Date();
  constructor(
    private route: ActivatedRoute,
    private companiesService: CompaniesService,
    private adapter : DateAdapter<any>
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.company = this.companiesService.companies.find(el => id == el.id);
    this.company.calcAverageIncome();
    this.company.calcLastMonthIncome();
    this.calcStartDate();
    this.endDate.setDate(0);
    this.company.calcSelected(this.startDate, this.endDate);
    this.adapter.setLocale('pl');
  }

  calcStartDate() {
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
  onClick() {
    console.log(this.startDate, this.endDate, this.company.selectedTotalIncome, this.company.selectedAvgIncome)
  }
  updateValueEnd(date) {
    this.endDate = date.value;
    this.company.calcSelected(this.startDate, this.endDate);
  }
  updateValueStart(date) {
    this.startDate = date.value;
    this.company.calcSelected(this.startDate, this.endDate);
  }

}
