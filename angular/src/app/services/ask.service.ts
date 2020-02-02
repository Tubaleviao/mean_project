import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AskService {
  private apiURL = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  signin(json): Observable<any> {
    console.log(json);
    return this.http.post(`${this.apiURL}/users/signin`, json);
  }

  signup(json): Observable<any> {
    console.log("asdfasdf: " + json);
    return this.http.post(`${this.apiURL}/users/signup`, json);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/unique?email=${email}`);
  }
}
