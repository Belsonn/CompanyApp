import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { CompaniesService } from "./companies.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class DataLoadedGuard implements CanActivate {
  constructor(
    private companiesService: CompaniesService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.companiesService.companies.length > 0) {
      return true;
    } else {
      this.router.navigate(["/companies"]);
    }
  }
}
