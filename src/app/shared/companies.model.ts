import { Income } from "./income.model";

export class Companies {
  constructor(json:any) {
    this.id = json.id;
    this.name = json.name;
    this.city = json.city;
    this.incomes = [];
    this.totalIncome = 0;
  }
  id: number;
  name: string;
  city: string;
  totalIncome: number;
  incomes: Income[];
  calcTotalIncome() {
    for(const x of this.incomes) {
      this.totalIncome += +x.value;
    }
  }
}
