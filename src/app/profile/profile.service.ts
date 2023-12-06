import { UserDeleteDialogComponent } from './../user-configuration/user-delete-dialog/user-delete-dialog.component';
// import { Profile } from './profile.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public identifier: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService) {
    
  }
  ngOnInit(): void {
    // this.identifier = this.cookieService.get('USER_ID');
    // //
    // console.log(this.identifier);
  }
  getUser(userId: string) {
    // return userId;
    console.log(userId);
    return this.http.get<User>('/api/users/'+ userId)
      .pipe(
        tap((user: User) => {
          return user;
        })
      );
  }
  
}
