/**
 * Title: security.module.ts
 * Author: Group 1
 * Date: Nov 19 2023
*/

// imports statements
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SecurityRoutingModule } from './security-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyQuestionsComponent } from './verify-questions/verify-questions.component';

@NgModule({
  declarations: [
    SignInComponent,
    ResetPasswordComponent,
    RegisterComponent,
    VerifyQuestionsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
