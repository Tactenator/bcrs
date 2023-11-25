import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../constants/cookie-keys';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const role = cookieService.get(COOKIE_KEYS.ROLE);

  return role === 'admin';
};
