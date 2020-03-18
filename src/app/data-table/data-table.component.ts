import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Companies } from "../shared/companies.model";
import { CompaniesService } from "../shared/companies.service";
import { PaginateService } from '../shared/paginate.service';

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"]
})
export class DataTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["id", "name", "city", "totalIncome"];
  dataSource: MatTableDataSource<Companies>;
  window : Window; // to check if its smaller than 375 px;
  page: number = 10; // default pageSize, onDestroy we send it to paginateService
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private companiesService: CompaniesService, private paginateService: PaginateService) {  }

  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.companiesService.companies); // Set data to table
    this.dataSource.filterPredicate = (data: Companies, filter: string) => { 
      return data.name.toLowerCase().includes(filter);
    }; // This makes filter looking for names only
    this.dataSource.paginator = this.paginator; // initialize paginator
    this.paginator.pageSize = this.paginateService.pageSize; // retrieve pageSize
    this.paginator.pageIndex = this.paginateService.pageIndex; // retrieve pageIndex
    this.dataSource.sort = this.sort; // initialize sort
    this.window = window;
  }

  
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value; // Get value from view
    filterValue = filterValue.trim(); // remove whitespace
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue; // comparing value
    if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage(); // go to FirstPage after using filter
    }
  }

  ngOnDestroy() {
    this.paginateService.pageSize = this.paginator.pageSize; // sending pageSize and pageIndex to service
    this.paginateService.pageIndex = this.paginator.pageIndex;
  }
}
