export class Income {
  value: number;
  date: Date;
  constructor(json: any){
    this.value = json.value;
    this.date = new Date(json.date);
  }
}
