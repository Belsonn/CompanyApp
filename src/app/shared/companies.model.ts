import { Income } from "./income.model";

export interface Companies {
  id: number;
  name: string;
  city: string;
  totalIncome: number;
  incomes: Income[];

}
