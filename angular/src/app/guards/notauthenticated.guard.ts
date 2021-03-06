import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { StoreService } from "../services/store.service";

@Injectable({
  providedIn: "root"
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private storeService: StoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!!!this.storeService.getToken()) {
      return true;
    }
    return this.router.parseUrl("/dashboard");
  }
}
