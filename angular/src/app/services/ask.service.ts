import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  constructor(private http: HttpClient) { }

  signin(json):Observable<any>{
    console.log(json)
    return this.http.post('http://localhost:3000/users/signin', json)
  }

  signup(json):Observable<any>{
    console.log("asdfasdf: "+json)
    return this.http.post('http://localhost:3000/users/signup', json)
  }

  emailUniqueness(email: string){
    ( http: HttpClient): Promise<any> | Observable<any> => {
      // { 'invalid': true } for not ok
      // null for ok
      return http.get('http://localhost:3000/unique?email='+email);
    }
  }
}
