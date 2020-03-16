import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Companies } from "./companies.model";
import { map } from "rxjs/operators";
import { Income } from "./income.model";

@Injectable({ providedIn: "root" })
export class CompaniesService {
  companies: Companies[] = [];
  lenght: number;
  isFetching: boolean = true;

  constructor(private http: HttpClient) {}

  fetchCompanies() {
    return this.http.get<Companies[]>(
      "https://recruitment.hal.skygate.io/companies"
    );
  }

  fetchIncome(companies: Companies[]) {
    for (const index in companies) {
      let companie: Companies = companies[index];
      this.http
        .get<{ id: number; incomes: Income[] }>(
          `https://recruitment.hal.skygate.io/incomes/${companies[index].id}`
        )
        .subscribe(incom => {
          companie.incomes = incom.incomes;
          this.companies.push(companie);
          this.lenght--;
        });
    }
  }
  calcIncome() {
    for (const company of this.companies) {
      company.totalIncome = 0;
      for (const singleIncome of company.incomes) {
        let inc: number = +singleIncome.value;
        company.totalIncome += inc;
      }
    }
  }
}