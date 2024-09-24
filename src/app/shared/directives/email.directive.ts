import { Directive } from "@angular/core";
import { NG_VALIDATORS } from "@angular/forms";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: "[emailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailRegexp.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
}
