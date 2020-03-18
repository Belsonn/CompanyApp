import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "./canvasjs.min.js";
import { CompaniesService } from "../shared/companies.service";
import { Companies } from "../shared/companies.model";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  company: Companies; // store selected company
  year: string = '2019'; // default year
  incomes: { y: number; label: string, color: string }[] = [
    { y: 0, label: "Jan.", color: ""},
    { y: 0, label: "Feb.", color: ""},
    { y: 0, label: "Mar.", color: ""},
    { y: 0, label: "Apr.", color: ""},
    { y: 0, label: "May", color: ""},
    { y: 0, label: "Jun.", color: ""},
    { y: 0, label: "Jul.", color: ""},
    { y: 0, label: "Aug.", color: ""},
    { y: 0, label: "Sep.", color: ""},
    { y: 0, label: "Oct.", color: ""},
    { y: 0, label: "Nov.", color: ""},
    { y: 0, label: "Dec.", color: ""}
  ]; // this is how looks data for chart
  constructor(
    private companiesService: CompaniesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"]; // getting id from params
    this.company = this.companiesService.companies.find(el => id == el.id); // initialize company
    this.calcMonthlyIncomes(); // render data for chart
    this.renderChart() // render chart
  }
  calcMonthlyIncomes() {
    for(const x of this.incomes) {
      x.y = 0; // reseting all data
    }
    for (const index of this.company.incomes) {
      let date = index.date.getMonth(); // get Month and if year is matching add it to Array
      if (index.date.getFullYear() == +this.year) {
        this.incomes[date].y += +index.value;
      }
    }
  }

  renderColor() {
    for(const index of this.incomes) {
      if(index.y >= 30000){
        index.color = "#85d64b"
      } else if (index.y >=15000) {
        index.color = "#dce359";
      } else {
        index.color = "#e05e5e";
      }
    }
  }
  // If user changed year or onInit, it renders chart using canvasJS library with given Data
  renderChart() {
    this.calcMonthlyIncomes()
    this.renderColor();
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: `Monthly Incomes of ${this.year}`
      },
      data: [
        {
          type: "column",
          dataPoints: this.incomes
        }
      ]
    });

    chart.render();
  }
}
