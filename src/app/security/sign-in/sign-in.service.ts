import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

export enum COOKIE_KEYS {
  NAME = 'firstName',
  EMP_ID = 'userId',
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  signIn(email: string, password: string) {
    return this.http.get('/api/users/' + email).pipe(
      tap((user) => {
        this.cookieService.set(COOKIE_KEYS.EMP_ID, user['userId']);
        this.cookieService.set(COOKIE_KEYS.NAME, user['firstName']);
        return user;
      })
    );
  }

  signOut() {
    return this.cookieService.deleteAll();
  }
}
