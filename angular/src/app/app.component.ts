import { Component, OnInit, OnDestroy } from "@angular/core";
import { store } from "./store/index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "MEAN Pro";
  storeUnsubscribe;
  authenticated: boolean = false;
  constructor() {
    this.authenticated = !!store.getState().jwt;
  }

  ngOnInit(): void {
    this.storeUnsubscribe = store.subscribe(() => {
      this.authenticated = !!store.getState().jwt;
    });
  }

  ngOnDestroy(): void {
    this.storeUnsubscribe();
  }
}
