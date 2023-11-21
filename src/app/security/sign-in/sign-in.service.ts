/**
 * Title: sign-in.component.ts
 * Author: Tiffany R.
 * Date: 21 Nov 2023
 * Description: sign-in component
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { of, tap } from 'rxjs';
import { User } from 'src/app/models/user';

export enum COOKIE_KEYS {
  NAME = 'firstName',
  USER_ID = 'userId',
}

// this is to test sign-in functionality until backend is completed
const testUser: User = {
  userId: '1',
  firstName: 'john',
  lastName: 'smith',
  email: 'mozart@nodebucket.com',
  password: 'Password01',
  phoneNumber: '',
  address: '',
  isDisabled: false,
  role: 'admin'
};

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // mocking backend response to test user sign-in
  signIn(email: string, password: string) {
    // return this.http.get<User>('/api/users/' + email)
    return of(testUser)
      .pipe(
        tap((user: User) => {
          this.cookieService.set(COOKIE_KEYS.USER_ID, user.userId);
          this.cookieService.set(COOKIE_KEYS.NAME, user.firstName);
          return user;
        })
      );
  }

  signOut() {
    return this.cookieService.deleteAll();
  }
}
