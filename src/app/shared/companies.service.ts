import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Companies } from "./companies.model";
import { map } from "rxjs/operators";
import { Income } from "./income.model";

@Injectable({ providedIn: "root" })
export class CompaniesService {
  companies: Companies[] = [];
  isFetching: boolean = true;

  constructor(private http: HttpClient) {}

  fetchCompanies() {
    return this.http.get<Companies[]>(
      "https://recruitment.hal.skygate.io/companies"
    );
  }

  fetchOneIncome(companie: Companies){
    companie.totalIncome = 0;
    return this.http.get<{ id: number; incomes: Income[] }>(
      `https://recruitment.hal.skygate.io/incomes/${companie.id}`
    ).pipe(map(incomArray => {
      companie.incomes = incomArray.incomes;
      for(const singleIncome of incomArray.incomes){
        companie.totalIncome += (+singleIncome.value);
      }
      return companie;
    }))
  }
}
