/**
 * Title: sign-in-guard.guard.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: Sign In Guard
 */

import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const signInGuard: CanActivateFn = (route, state) => {
  //injects cookie service
  const cookieService = inject(CookieService);

  //checks to see if cookie exists of ane employeeId. If yes, returns true and navigates to tasks. Otherwise, sends error and navigates to login page again.
  const user = cookieService.get('EMP_ID');
  if (user) {
    return true;
  }

  else {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};

export const signInGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
