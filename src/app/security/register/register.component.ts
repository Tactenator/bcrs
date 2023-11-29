/**
 * Title: register.component.ts
 * Author: Tiffany R., Patrick C.
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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private registerService: RegisterService
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
      ],
    });
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    console.log('Register service called');
    const formValues = this.registerForm.value;
    this.registerService
      .register(
        formValues.firstName,
        formValues.lastName,
        formValues.email,
        formValues.password
      )
      .subscribe({
        next: (employee) => {
          this.router.navigate(['profile']);
        },
        error(err) {
          console.log(err);
        },
      });
    // const formValues = this.registerForm.value;
    // console.log(formValues);
    // this.registerService.register();
    // this.registerService.onSubmit();
    // this.router.navigate(['']);
  }
}
