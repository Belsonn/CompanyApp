import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class PaginateService {
    pageSize: number = 10;
    pageIndex: number = 0;
}