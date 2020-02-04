import { Injectable } from "@angular/core";
import { store } from "../store/index";
import { saveJWT, logout, saveUser } from "../store/actions";

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

  saveUser(user){
    store.dispatch(saveUser(user));
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
