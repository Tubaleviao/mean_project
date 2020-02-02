import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AskService } from "src/app/services/ask.service";
import { AsyncUniqueEmailValidator } from "src/app/validators/async-unique-email";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  roles: any[] = ["Victim", "Stalker", "Witness"];

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ask: AskService,
    emailValidator: AsyncUniqueEmailValidator
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
    // TODO: Use EventEmitter with form value
    console.warn(this.signUpForm.value);
    this.ask
      .signup(Object.assign({}, this.signUpForm.value))
      .subscribe(console.log);
  }
}
