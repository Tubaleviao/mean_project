import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AskService } from "src/app/services/ask.service";
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

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
    //console.log("submit")
    // TODO: Use EventEmitter with form value
    //console.warn(this.signInForm.value);
    //console.log(this.signInForm);

    this.ask.signin(this.signInForm.value).subscribe((r) => {
      console.log("afdasdfasdfsadfsadf");
      console.log(r);
      if(r.status == 200){
        this.ask.saveToken(r.body.token)
      }else{
        console.log("sdfsadf")
        this.snackBar.open("testing", "Close", {
          duration: 2000,
        })
      }
      //this.ask.saveToken(r.token)
      // TODO: Add to redux state
      //this.router.navigate(["dashboard"]);
    });
  }
}
