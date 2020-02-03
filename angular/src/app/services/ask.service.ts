import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { store } from "../store/index";
import { map } from "rxjs/operators/";
import { saveJWT } from "../store/actions";

@Injectable({
  providedIn: "root"
})
export class AskService {
  private apiURL = "http://tuba.work:3000";

  constructor(private http: HttpClient) {}

  signin(json): Observable<any> {
    return this.http
      .post(`${this.apiURL}/users/signin`, json, {observe: "response"})
      //.pipe(map(({ token }) => store.dispatch(saveJWT(token))));
  }

  saveToken(token){
    store.dispatch(saveJWT(token))
  }

  signup(json): Observable<any> {
    return this.http.post(`${this.apiURL}/users/signup`, json);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/users/unique?email=${email}`);
  }
}
