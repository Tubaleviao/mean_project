import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { store } from "../store";

@Injectable({
  providedIn: "root"
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = store.getState().jwt;
    if (!token || token.split(".").length !== 3) {
      return this.router.parseUrl("/login");
    }
    return true;
  }
}
