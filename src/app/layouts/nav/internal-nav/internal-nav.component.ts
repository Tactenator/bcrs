/**
 * Title: internal-nav.component.ts
 * Author: Tiffany R.,
 * Date: 21 Nov 2023
 */

// imports statements
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-internal-nav',
  templateUrl: './internal-nav.component.html',
  styleUrls: ['./internal-nav.component.css']
})
export class InternalNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  openSidenav() {
    this.sidenav.open();
  }
}
