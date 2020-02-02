import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AskService } from "src/app/services/ask.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  roles: any[] = ["Victim", "Stalker", "Witness"];

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private ask: AskService) {
    this.signUpForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      email: [
        "",
        [Validators.required, Validators.email, this.emailUniqueness]
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

  emailUniqueness(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscriber = this.ask.verifyEmail(control.value).subscribe(
        data => {
          resolve();
        },
        reject,
        () => subscriber.unsubscribe()
      );
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signUpForm.value);
    this.ask
      .signup(Object.assign({}, this.signUpForm.value))
      .subscribe(console.log);
  }
}
