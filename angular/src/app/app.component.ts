import { Component, OnInit, OnDestroy } from "@angular/core";
import { store } from "./store/store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "MEAN Pro";
  storeUnsubscribe;
  authenticated: boolean = false;

  ngOnInit(): void {
    this.storeUnsubscribe = store.subscribe(() => {
      this.authenticated = !!store.getState().jwt;
    });
  }

  ngOnDestroy(): void {
    this.storeUnsubscribe();
  }
}
