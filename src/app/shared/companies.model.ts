import { Income } from "./income.model";

export class Companies {
  id: number;
  name: string;
  city: string;
  totalIncome: number;
  incomes: Income[] = [];

}
