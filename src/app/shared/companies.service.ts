import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Companies } from "./companies.model";
import { map } from "rxjs/operators";
import { Income } from "./income.model";

@Injectable({ providedIn: "root" })
export class CompaniesService {
  companies: Companies[] = [];
  isFetching: boolean = true;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private http: HttpClient) {}

  fetchCompanies() {
    let companies1 : Companies[] = []
    return this.http.get<string>(
      "https://recruitment.hal.skygate.io/companies"
    ).pipe(map(companies =>{
      for(const index of companies){
        let company = new Companies(index);
        companies1.push(company);
      }
      return companies1;
    }))
  }

  fetchOneIncome(companie: Companies){
    return this.http.get<{id:string, incomes:string[]}>(
      `https://recruitment.hal.skygate.io/incomes/${companie.id}`
    ).pipe(map(incomArray => {
      for(const x of incomArray.incomes){
        companie.incomes.push(new Income(x));
      }
      return companie;
    }))
  }

  // checkData() {
  //   const promise = new Promise((resolve, reject) => {
  //     resolve(this.companies.length)
  //   })
  //   return promise;
  // }
}
