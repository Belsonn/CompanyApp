import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Companies } from "./companies.model";
import { map } from "rxjs/operators";
import { Income } from "./income.model";


// This service fetching data from API and storing all companies Data
// Converts Json Objects to Companies and Income Objects
@Injectable({ providedIn: "root" })
export class CompaniesService {
  companies: Companies[] = [];
  isFetching: boolean = true;

  constructor(private http: HttpClient) {}
  // Fetch all companies.
  fetchCompanies() {
    let companies1 : Companies[] = []
    return this.http.get<string>(
      "https://recruitment.hal.skygate.io/companies"
    ).pipe(map(companies =>{
      for(const index of companies){
        let company = new Companies(index); // it makes Companies Object for one single Company it gets from API
        companies1.push(company);
      }
      return companies1;
    }))
  }
  // Fetch single company incomes
  fetchOneIncome(companie: Companies){
    return this.http.get<{id:string, incomes:string[]}>(
      `https://recruitment.hal.skygate.io/incomes/${companie.id}`
    ).pipe(map(incomArray => {
      for(const x of incomArray.incomes){
        companie.incomes.push(new Income(x));  // it makes Income Object for one single Income it gets from API
      }
      return companie;
    }))
  }

}
