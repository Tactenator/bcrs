/**
 * Title: sign-in.component.ts
 * Author: Tiffany R.
 * Date: 20 Nov 2023
 * Description: sign-in component
 */

// importing class elements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { COOKIE_KEYS } from 'src/app/constants/cookie-keys';
import { SignInService } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  resetForm: FormGroup;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
      ],
    });
  }
  get form() {
    return this.resetForm.controls;
  }

  onSubmit() {
    const formValues = this.resetForm.value;

    this.signInService.getSecurityQuestions(formValues.email).subscribe({
      next: (question) => {
        // this.router.navigate(['verify-questions']);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getEmailErrorMessage() {
    const emailControl = this.resetForm.controls['email'];

    if (emailControl.hasError('required')) {
      return 'You must enter an email.';
    }

    return emailControl.hasError('email') ? 'Not a valid email.' : '';
  }

}
