import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { store } from "../store/store";

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = store.getState().jwt;
    const request = req.clone(
      !!token
        ? {
            headers: req.headers.set("Authorization", `Bearer ${token}`)
          }
        : undefined
    );
    return next.handle(request).pipe(
      map(res => {
        return res;
      })
    );
  }
}
