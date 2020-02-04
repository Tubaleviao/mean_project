import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AskService } from "src/app/services/ask.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ask: AskService,
    private storeService: StoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signInForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  get password() {
    return this.signInForm.get("password");
  }

  get username() {
    return this.signInForm.get("username");
  }

  ngOnInit() {}

  onSubmit() {
    this.ask.signin(this.signInForm.value).subscribe(r => {
      if (r.body.ok) {
        console.log(r.body)
        this.storeService.saveToken(r.body.token);
        this.storeService.saveUser(r.body.data);
        this.router.navigate(["dashboard"]);
      } else {
        this.snackBar.open(r.body.message, "Close", {
          duration: 2000
        });
      }
    });
  }
}
