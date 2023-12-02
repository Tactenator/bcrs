import { AbstractControl } from '@angular/forms';
/**
 * Title: register.component.ts
 * Author: Patrick C.
 * Date: 28 Nov 2023
 * Description: sign-in component
 *
 */
import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { COOKIE_KEYS } from 'src/app/constants/cookie-keys';
//
import { ConfirmPasswordValidator } from './confirmPasswordValidator';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  errorMessage: string;
  //
  passwords: FormGroup;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private registerService: RegisterService // public abstractControl: AbstractControl
  ) {
    console.log(this.cookieService.get(COOKIE_KEYS.USER_ID));
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$'),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: [
        '',
        Validators.compose([Validators.required]),
        // new ConfirmPasswordValidator,
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$'),
        ]),
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ]),
      ],

      //^?
      // this feature is under construction
      // I want to confirm the password reentering the same value and comparing it
      // to enable the submit button
      // validators: confirmPasswordValidator,
      // ^?
    });
    this.registerForm.valueChanges.subscribe(console.log);
    this.registerForm.valueChanges.subscribe(console.dir);
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    const formValues = this.registerForm.value;
    const password = this.registerForm.controls['password'].value;
    const confirmPassword = this.registerForm.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
    } else {
      console.log(formValues);
      this.registerService
        .register(
          formValues.firstName,
          formValues.lastName,
          formValues.email,
          formValues.password,
          // formValues.confirmPassword,
          formValues.phoneNumber,
          formValues.address
        )
        .subscribe({
          next: (employee) => {
            this.router.navigate(['profile']);
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }
}
