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

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private securityApiUrl = '/api/security';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _role = new BehaviorSubject<string>('');
  role$: Observable<string> = this._role.asObservable();

  private _currentFirstName = new BehaviorSubject<string>('');
  currentFirstName$: Observable<string> = this._currentFirstName.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this._isLoggedIn.next(this.cookieService.check(COOKIE_KEYS.USER_ID));
    this._role.next(this.cookieService.get(COOKIE_KEYS.ROLE));
    this._currentFirstName.next(this.cookieService.get(COOKIE_KEYS.NAME));
  }

  signIn(email: string, password: string) {
    return this.http.post<User>('/api/signin/', { email, password })
      .pipe(
        tap((user: User) => {
          this.cookieService.set(COOKIE_KEYS.USER_ID, user.userId);
          this.cookieService.set(COOKIE_KEYS.NAME, user.firstName);
          this.cookieService.set(COOKIE_KEYS.ROLE, user.role);
          this._role.next(user.role);
          this._isLoggedIn.next(true);
          this._currentFirstName.next(user.firstName);
          return user;
        })
      );
  }

  registerUser(user: AddUserRequest): Observable<User> {
    return this.http.post<User>(`${this.securityApiUrl}/register`, user);
  }

  getSecurityQuestions(email: string) {
    return this.http.get<SecurityQuestionResponse[]>(`/api/users/${email}/security-questions`);
  }

  verifySecurityQuestions(email: string, request: VerifyQuestionRequest[]) {
    return this.http.post<SecurityQuestionResponse[]>(`${this.securityApiUrl}/${email}/verify-security-questions`, request);
  }

  resetPassword(email: string, request: ResetPasswordRequest) {
    return this.http.post<SecurityQuestionResponse[]>(`${this.securityApiUrl}/users/${email}/reset-password`, request);
  }

  signOut() {
    this._role.next('');
    this._isLoggedIn.next(false);
    this._currentFirstName.next('');
    this.cookieService.deleteAll();
  }
}
