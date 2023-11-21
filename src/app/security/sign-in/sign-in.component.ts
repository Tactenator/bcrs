/**
 * Title: sign-in.component.ts
 * Author: Tiffany R., Patrick C.
 * Date: 20 Nov 2023
 * Description: sign-in component
 */

// importing class elements
import { Component, OnInit } from '@angular/core';
import { COOKIE_KEYS, SignInService } from './sign-in.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

// import { get } from 'mongoose';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  hide = true;
  errorMessage: string;


  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private signInService: SignInService
  ) {
    console.log(this.cookieService.get(COOKIE_KEYS.USER_ID));
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }
  get form() {
    return this.signInForm.controls;
  }

  onSubmit() {
    const formValues = this.signInForm.value;

    this.signInService.signIn(formValues.email, formValues.password).subscribe({
      next: (employee) => {
        this.router.navigate(['profile']);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getEmailErrorMessage() {
    const emailControl = this.signInForm.controls['email'];

    if (emailControl.hasError('required')) {
      return 'You must enter an email.';
    }

    return emailControl.hasError('email') ? 'Not a valid email.' : '';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.signInForm.controls['password'];

    return passwordControl.hasError('required') ? 'You must enter a password.' : '';
  }
}
