import { Injectable } from "@angular/core";
import { store } from "../store/index";
import { saveJWT, logout } from "../store/actions";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  getState() {
    return store.getState();
  }

  getStore() {
    return store;
  }

  saveToken(token) {
    store.dispatch(saveJWT(token));
  }

  logout() {
    store.dispatch(logout());
  }

  getToken() {
    return this.getState().jwt;
  }
}
