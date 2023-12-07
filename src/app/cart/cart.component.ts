/**
 * Title: cart.component.ts
 * Author: Tiffany Reyes
 * Date: 5 Dec 2023
 * Description: cart component
 */

import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Service } from '../models/service';
import { Invoice } from '../models/invoice';
import { SecurityService } from '../security/security.service';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  selectedServices: Service[] = this.cartService.selectedServices;
  total: number = this.cartService.total;

  currentUser$ = this.securityService.currentUser$;

  constructor(
    private cartService: CartService,
    private securityService: SecurityService,
    private router: Router
  ) {}

  submitInvoice(user: User) {
    const invoice: Invoice = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      lineItems: this.selectedServices,
      partsAmount:'',
      laborAmount: '',
      lineItemTotal: this.total,
      invoiceTotal: this.total,
      orderDate: new Date()
    }

    this.cartService.submitInvoice(invoice).subscribe(
      (response) => {
        console.log('Invoice submitted successfully:', response);

        this.showPrintableInvoice = true;

        // Assign the response to the 'invoice' property
        this.invoice = response;

        // Navigate to the printable invoice route
        this.router.navigate(['/printable-invoice', user.email]);
      },
      (error) => {
        console.error('Error submitting invoice:', error);
        // Handle errors
      }
    );
  }
  invoice: Invoice;
  showPrintableInvoice = false;
}
