import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";

@Injectable({
  providedIn: "root"
})
export class AskService {
  private apiURL = "http://locahost:3000"; // also change at socket service

  constructor(private http: HttpClient, private storeService: StoreService) {}

  signin(json): Observable<any> {
    return this.http.post(`${this.apiURL}/users/signin`, json, {
      observe: "response"
    });
  }

  signup(json): Observable<any> {
    return this.http.post(`${this.apiURL}/users/signup`, json);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiURL}/users/unique?email=${email}`);
  }

  searchUsers(criteria: string): Observable<any> {
    return this.http.get(`${this.apiURL}/users/search?_q=${criteria}`);
  }
}
