import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInForm = fb.group({
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
    // TODO: Use EventEmitter with form value
    console.warn(this.signInForm.value);
  }
}
