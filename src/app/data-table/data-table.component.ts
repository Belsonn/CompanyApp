import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Companies } from "../shared/companies.model";
import { CompaniesService } from "../shared/companies.service";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"]
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "city", "totalIncome"];
  dataSource: MatTableDataSource<Companies>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private companiesService: CompaniesService) {
    this.dataSource = new MatTableDataSource(this.companiesService.companies);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.companiesService.companies);
    this.dataSource.filterPredicate = (data: Companies, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
    }
  }
}
