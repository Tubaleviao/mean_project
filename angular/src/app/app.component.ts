import { Component, OnInit, OnDestroy } from "@angular/core";
import { StoreService } from "./services/store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "MEAN Pro";
  storeUnsubscribe;
  authenticated: boolean = false;
  constructor(private storeService: StoreService, private router: Router) {
    this.authenticated = !!this.storeService.getToken();
  }

  ngOnInit(): void {
    this.storeUnsubscribe = this.storeService.getStore().subscribe(() => {
      const token = this.storeService.getToken();
      this.authenticated = !!token;

      if (!!!token) {
        this.router.navigate(["login"]);
      }
    });
  }

  ngOnDestroy(): void {
    this.storeUnsubscribe();
  }
}
