import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/add-user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../constants/cookie-keys';
import { SecurityQuestionResponse } from '../models/security-question';
import { VerifyQuestionRequest } from '../models/verify-question';
import { ResetPasswordRequest } from '../models/reset-password';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private securityApiUrl = '/api/security';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<User>(null);
  currentUser$: Observable<User> = this._currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this._isLoggedIn.next(this.cookieService.check(COOKIE_KEYS.USER_ID));

    // if userId cookie present, fetch user from backend
    if (this.cookieService.check(COOKIE_KEYS.USER_ID)) {
      this.getUser(this.cookieService.get(COOKIE_KEYS.USER_ID)).subscribe();
    }
  }

  signIn(email: string, password: string) {
    return this.http.post<User>('/api/signin/', { email, password }).pipe(
      tap((user) => {
        return this.setUser({ ...user, lastSignInDate: new Date() });
      })
    );
  }

  getUser(id: string) {
    return this.http.get<User>(`/api/users/${id}`).pipe(
      tap((user: User) => {
        let lastSignIn: Date = null;
        if (this.cookieService.check(COOKIE_KEYS.LAST_SIGN_IN)) {
          lastSignIn = new Date(this.cookieService.get(COOKIE_KEYS.LAST_SIGN_IN))
        }

        return this.setUser({ ...user, lastSignInDate: lastSignIn });
      })
    );
  }

  registerUser(user: AddUserRequest): Observable<User> {
    return this.http.post<User>(`${this.securityApiUrl}/register`, user);
  }

  getSecurityQuestions(email: string) {
    return this.http.get<SecurityQuestionResponse[]>(
      `/api/users/${email}/security-questions`
    );
  }

  verifySecurityQuestions(email: string, request: VerifyQuestionRequest[]) {
    return this.http.post<SecurityQuestionResponse[]>(
      `${this.securityApiUrl}/${email}/verify-security-questions`,
      request
    );
  }

  resetPassword(email: string, request: ResetPasswordRequest) {
    return this.http.post<SecurityQuestionResponse[]>(
      `${this.securityApiUrl}/users/${email}/reset-password`,
      request
    );
  }

  signOut() {
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
    this.cookieService.deleteAll();
    localStorage.clear();
    this.router.navigate(['/home']).then(() => {
      location.reload();
    });
  }

  // populates necessary cookies and user state of application
  private setUser(user: User) {
    this.cookieService.set(COOKIE_KEYS.USER_ID, user._id);
    this.cookieService.set(COOKIE_KEYS.NAME, user.firstName);
    this.cookieService.set(COOKIE_KEYS.ROLE, user.role);
    if (user.lastSignInDate !== undefined || user.lastSignInDate !== null) {
      this.cookieService.set(COOKIE_KEYS.LAST_SIGN_IN, user.lastSignInDate.toString());
    }
    this._isLoggedIn.next(true);
    this._currentUser.next(user);
    return user;
  }
}
