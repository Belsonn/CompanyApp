import { Income } from "./income.model";

export class Companies {
  id: number;
  name: string;
  city: string;
  totalIncome: number;
  incomes: Income[];
  averageIncome: number;
  lastMonthIncome: number;
  selectedAvgIncome: number;
  selectedTotalIncome: number;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.city = json.city;
    this.incomes = [];
    this.totalIncome = 0;
    this.averageIncome = 0;
    this.lastMonthIncome = 0;
    this.selectedAvgIncome = 0;
    this.selectedTotalIncome = 0;
  }

  calcTotalIncome() {
    for (const x of this.incomes) {
      this.totalIncome += +x.value;
    }
  }
  calcAverageIncome() {
    this.averageIncome = this.totalIncome / this.incomes.length;
  }

  calcLastMonthIncome() {
    let date = new Date();
    if (date.getMonth() == 0) {
      date.setMonth(11);
      date.setFullYear(date.getFullYear() - 1);
    } else {
      date.setMonth(date.getMonth() - 1);
    }
    for (const index of this.incomes) {
      if (
        index.date.getMonth() == date.getMonth() &&
        index.date.getFullYear() == date.getFullYear()
      ) {
        this.lastMonthIncome += +index.value;
      }
    }
  }

  calcSelectedAverage(startDate: Date, endDate: Date) {
    let sum: number = 0;
    let total: number = 0;
    for (const index of this.incomes) {
      if (+index.date >= +startDate && +index.date <= +endDate) {
        sum += +index.value;
        total++;
      }
    }
    if((sum/total)){
      this.selectedAvgIncome = (sum / total)
    } else {
      this.selectedAvgIncome = 0;
    }
  }

  calcSelectedTotal(startDate: Date, endDate: Date) {
    this.selectedTotalIncome = 0;
    for (const index of this.incomes) {
      if (+index.date >= +startDate && +index.date <= +endDate) {
        this.selectedTotalIncome += +index.value;
      }
    }
  }
  calcSelected(startDate: Date, endDate: Date) {
    this.calcSelectedAverage(startDate, endDate);
    this.calcSelectedTotal(startDate, endDate);
  }
}
