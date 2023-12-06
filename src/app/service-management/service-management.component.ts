/**
 * Title: service-management.component.ts
 * Author: Tiffany Reyes
 * Date: 5 Dec 2023
 * Description: service-management component
 */

import { Component } from '@angular/core';
import { Service } from '../models/service';
import { CartService } from '../cart/cart.service';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent {
  services: Service[] = this.cartService.services;
  currentUser$ = this.securityService.currentUser$;

  constructor(
    private cartService: CartService,
    private securityService: SecurityService) {}

  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
