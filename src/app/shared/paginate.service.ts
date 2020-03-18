import { Injectable } from '@angular/core';

// this service allows you to remember the state of the table
@Injectable({ providedIn: 'root'})
export class PaginateService {
    pageSize: number = 10;
    pageIndex: number = 0;
}