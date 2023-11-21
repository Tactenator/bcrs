import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEYS } from '../security/sign-in/sign-in.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  role: string;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.role = this.cookieService.get(COOKIE_KEYS.ROLE);
  }

}
