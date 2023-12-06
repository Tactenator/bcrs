/**
 * Title: cart.service.ts
 * Author: Tiffany Reyes
 * Date: 5 Dec 2023
 * Description: cart service
 */

import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { Invoice } from '../models/invoice';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  services: Service[] = [
    {
      id: 1,
      name: 'Password Reset',
      description: 'A locked out device is no problem for our certified technicians who can reset your device\'s password and get you back in your device.',
      price: 39.99
    },
    {
      id: 2,
      name: 'Spyware Removal',
      description: 'Worried about a link you opened or is your device acting weird? Our spyware removal service takes a detailed scan of your device to ensure that sensitive information on your device is kept safe.',
      price: 99.99
    },
    {
      id: 3,
      name: 'RAM Upgrade',
      description: 'Device running slower than usual? Let\'s speed up your processing with an upgrade. By upgrading your RAM on your computer, your device is guaranteed to have faster processing speeds and increase device efficiency.',
      price: 129.99
    },
    {
      id: 4,
      name: 'Software Installation',
      description: 'Installing software you need can be scary to do by yourself so let us help! Tell us what you need and we will install it for you! We also will educate you on the process of launching, storage, and updates for your software.',
      price: 49.99
    },
    {
      id: 5,
      name: 'PC Tune-up',
      description: 'Our tune up service takes an in depth look at your PC to monitor where are the problem areas in your device that are hindering efficiency. From there we repair any issues reported and review duplicate files to get your device performing better than before.',
      price: 89.99
    },
    {
      id: 6,
      name: 'Keyboard Cleaning',
      description: 'Increase the longevity of your keyboard through the removal of everyday grime. Our service removes dust, oils, and harmful residues from inside and outside your keyboard for the cleanest experience.',
      price: 45.00
    },
    {
      id: 7,
      name: 'Disk Clean-up',
      description: 'Need space? Let us clear up any unnecessary clutter on your device so you can get back to using your device to its full potential.',
      price: 129.99
    }
  ];

  selectedServices: Service[] = [];
  total: number = 0;

  constructor() {
    this.selectedServices = JSON.parse(localStorage.getItem('cart') || '[]');
    // creates total based on array
    this.total = this.calculateTotal(this.selectedServices);
  }

  addToCart(id: number) {
    this.selectedServices.push(this.services.find(service => service.id === id));

    // creates total based on array
    this.total = this.calculateTotal(this.selectedServices);
    // save cart to local storage
    localStorage.setItem('cart', JSON.stringify(this.selectedServices));
    console.log(this.selectedServices);
  }

  // this needs to be edited once backend and invoice summary is completed
  submitInvoice(invoice: Invoice) {
    // integrate backend
    return of({})
  }

  private calculateTotal(selectedServices: Service[]) {
    // create an array of prices
    const prices = this.selectedServices.map(service => service.price);
    return prices.reduce((a, b) => a + b, 0);
  }
}
