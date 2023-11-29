/**
 * Title: security-routing.module.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    title: 'BCRS: Security',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
