/**
 * Title: internal-nav.component.ts
 * Author: Tiffany R.,
 * Date: 21 Nov 2023
 */

// imports statements
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SignInService } from 'src/app/security/sign-in/sign-in.service';

@Component({
  selector: 'app-base-nav',
  templateUrl: './base-nav.component.html',
  styleUrls: ['./base-nav.component.css']
})
export class BaseNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isLoggedIn$ = this.signInService.isLoggedIn$;
  role$ = this.signInService.role$;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private signInService: SignInService
  ) {}

  openSidenav() {
    this.sidenav.open();
  }

  signOut() {
    this.signInService.signOut();
    this.router.navigate(['/']);
  }
}
