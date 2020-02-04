import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AskService {
  private apiURL = "http://localhost:3000"; // also change at socket service

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

  addFriend(friend): Observable<boolean> {
    return this.http
      .post(
        `${this.apiURL}/users/${this.storeService.getUser()._id}/friends`,
        friend
      )
      .pipe(
        map(({ success }: { success: boolean }) => {
          if (success) this.storeService.addFriend(friend);
          return success;
        })
      );
  }

  loadFriends() {
    return this.http
      .get(`${this.apiURL}/users/${this.storeService.getUser()._id}/friends`)
      .pipe(
        map((friends: string[]) => {
          this.storeService.setFriends(friends);
          return friends;
        })
      );
  }

  removeFriend(friendId): Observable<any> {
    return this.http.delete(
      `${this.apiURL}/users/${
        this.storeService.getUser()._id
      }/friends/${friendId}`
    );
  }
}
