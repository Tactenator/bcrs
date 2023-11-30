/**
 * Title: sign-in.component.ts
 * Author: Tiffany R.
 * Date: 21 Nov 2023
 * Description: sign-in component
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { COOKIE_KEYS } from 'src/app/constants/cookie-keys';
import { ResetPasswordRequest } from 'src/app/models/reset-password';
import { SecurityQuestionResponse } from 'src/app/models/security-question';
import { User } from 'src/app/models/user';
import { VerifyQuestionRequest } from 'src/app/models/verify-question';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private _isLoggedIn = new BehaviorSubject<string>('');
  isLoggedIn$: Observable<string> = this._isLoggedIn.asObservable();

  private _role = new BehaviorSubject<string>('');
  role$: Observable<string> = this._role.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
     this._isLoggedIn.next(this.cookieService.check(COOKIE_KEYS.USER_ID) ? 'true' : 'false');
     this._role.next(this.cookieService.get(COOKIE_KEYS.ROLE));
  }

  // mocking backend response to test user sign-in
  signIn(email: string, password: string) {
    return this.http.post<User>('/api/signin/', { email, password })
      .pipe(
        tap((user: User) => {
          this.cookieService.set(COOKIE_KEYS.USER_ID, user.userId);
          this.cookieService.set(COOKIE_KEYS.NAME, user.firstName);
          this.cookieService.set(COOKIE_KEYS.ROLE, user.role);
          this._role.next(user.role);
          this._isLoggedIn.next('true');
          return user;
        })
      );
  }

  getSecurityQuestions(email: string) {
    return this.http.get<SecurityQuestionResponse[]>(`/api/users/${email}/security-questions`);
  }

  verifySecurityQuestions(email: string, request: VerifyQuestionRequest[]) {
    return this.http.post<SecurityQuestionResponse[]>(`/api/security/${email}/verify-security-questions`, request);
  }

  resetPassword(email: string, request: ResetPasswordRequest) {
    return this.http.post<SecurityQuestionResponse[]>(`/api/security/users/${email}/reset-password`, request);
  }

  signOut() {
    this._role.next('');
    this._isLoggedIn.next('false');
    this.cookieService.deleteAll();
  }
}
