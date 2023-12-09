import { CanMatchFn } from '@angular/router';
import { SecurityService } from '../security/security.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const securityService = inject(SecurityService);

  return securityService.isLoggedIn$;
};
