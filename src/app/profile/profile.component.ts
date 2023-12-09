import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../constants/cookie-keys';
import { User } from '../models/user';
import { UserService } from '../user-configuration/user.service';
import { SecurityService } from '../security/security.service';
import { ProfileService } from './profile.service';

export interface Profile
  extends Pick<
    User,
    'firstName' | 'lastName' | 'email' | 'address' | 'phoneNumber' | 'role'
  > {}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
  test: any;
  currentUser$ = this.securityService.currentUser$;

  constructor(
    private cookieService: CookieService,
    public profileService: ProfileService,
    public securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.userId = this.cookieService.get(COOKIE_KEYS.USER_ID);
    console.log(this.userId);
    this.test = this.profileService.getUser(this.userId);
    console.log(this.test);
    this.firstName = this.cookieService.get(COOKIE_KEYS.NAME);
    this.role = this.cookieService.get(COOKIE_KEYS.ROLE);
    // this.address = this.profileService.identifier;
  }
}
