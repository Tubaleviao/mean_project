import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AskService } from "src/app/services/ask.service";
import { AsyncUniqueEmailValidator } from "src/app/validators/async-unique-email";
import {MatSnackBar} from "@angular/material/snack-bar"
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  roles: any[] = ["Victim", "Stalker", "Witness"];
  selected;

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ask: AskService,
    emailValidator: AsyncUniqueEmailValidator,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      email: [
        "",
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [emailValidator],
          updateOn: "blur"
        }
      ],
      role: [this.roles]
    });
  }

  get password() {
    return this.signUpForm.get("password");
  }

  get username() {
    return this.signUpForm.get("username");
  }

  get email() {
    return this.signUpForm.get("email");
  }

  ngOnInit() {}

  onSubmit() {
    this.ask
      .signup(Object.assign({}, this.signUpForm.value))
      .subscribe(m => {
        this.snackBar.open(m, "Close", {
          duration: 2000
        })
        this.router.navigate(["login"]);
      });
  }
}
