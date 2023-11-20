
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
    console.log(this.cookieService.get(COOKIE_KEYS.EMP_ID));
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      userId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }
  get form() {
    return this.signInForm.controls;
  }

  onSubmit() {
    const formValues = this.signInForm.value;
    //this is how we capture the values of the form

    const userId = parseInt(formValues.userId);

    this.signInService.signIn(userId).subscribe({
      next: (employee) => {
        this.router.navigate(['/tasks']);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
