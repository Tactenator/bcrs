/**
 * Title: register.service.ts
 * Author: Patrick Cuauro
 * Date: 25 Nov 2023
 * Description: register service
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as e from 'express';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { COOKIE_KEYS } from 'src/app/constants/cookie-keys';
// import { SecurityQuestionResponse } from 'src/app/models/security-question';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  public role = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.role.next(this.cookieService.get(COOKIE_KEYS.ROLE));
  }
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber?: null,
    address?: '',
    userId?: '',
    //How is userId determined?
    role?: 'user',
    securityQuestions?: undefined
  ) {
    // console.log('Register service called' + email);
    return this.http.post<User>('/api/users/', {
      // return this.http.post<User>('/security/register', {
      
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      userId,
      role,
      securityQuestions,
    });
  }
  // onSubmit() {
  //   console.log('Register2 service called');
  // }
}
