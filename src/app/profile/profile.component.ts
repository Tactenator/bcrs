import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../constants/cookie-keys';
import { User } from '../models/user';
import { SecurityService } from '../security/security.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  role: string;
  currentUser$: Observable<User> = this.securityService.currentUser$;

  constructor(
    private cookieService: CookieService,
    public securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.role = this.cookieService.get(COOKIE_KEYS.ROLE);
  }
}
