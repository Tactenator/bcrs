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

@Component({
  selector: 'app-internal-nav',
  templateUrl: './internal-nav.component.html',
  styleUrls: ['./internal-nav.component.css']
})
export class InternalNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router, private cookieService: CookieService) {}

  openSidenav() {
    this.sidenav.open();
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }
}
