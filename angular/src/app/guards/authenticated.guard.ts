import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { StoreService } from "../services/store.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private storeService: StoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.storeService.getToken();
    if (!token || token.split(".").length !== 3) {
      return this.router.parseUrl("/login");
    }
    return true;
  }
}
