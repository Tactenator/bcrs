/**
 * Title: internal-nav.component.ts
 * Author: Tiffany R.,
 * Date: 21 Nov 2023
 */

// imports statements
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-base-nav',
  templateUrl: './base-nav.component.html',
  styleUrls: ['./base-nav.component.css']
})
export class BaseNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  openSidenav() {
    this.sidenav.open();
  }
}
