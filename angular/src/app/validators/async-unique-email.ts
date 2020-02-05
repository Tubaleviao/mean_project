import { Injectable } from "@angular/core";

import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";

import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AskService } from "../services/ask.service";

@Injectable({ providedIn: "root" })
export class AsyncUniqueEmailValidator implements AsyncValidator {
  constructor(private ask: AskService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.ask.verifyEmail(ctrl.value).pipe(
      map(response =>
        response && response.invalid ? { existingEmail: true } : null
      ),
      catchError(() => [null])
    );
  }
}
