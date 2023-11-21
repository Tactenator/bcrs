import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { standardGuard } from './standard.guard';

describe('standardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => standardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
