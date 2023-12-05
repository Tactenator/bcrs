import { Component } from '@angular/core';
import { Service } from '../models/service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent {
  services: Service[] = [
    {
      name: 'Password Reset',
      description: 'A locked out device is no problem for our certified technicians who can reset your device\'s password and get you back in your device.',
      price: 39.99
    },
    {
      name: 'Spyware Removal',
      description: 'Worried about a link you opened or is your device acting weird? Our spyware removal service takes a detailed scan of your device to ensure that sensitive information on your device is kept safe.',
      price: 99.99
    },
    {
      name: 'RAM Upgrade',
      description: 'Device running slower than usual? Let\'s speed up your processing with an upgrade. By upgrading your RAM on your computer, your device is guaranteed to have faster processing speeds and increase device efficiency.',
      price: 129.99
    },
    {
      name: 'Software Installation',
      description: 'Installing software you need can be scary to do by yourself so let us help! Tell us what you need and we will install it for you! We also will educate you on the process of launching, storage, and updates for your software.',
      price: 49.99
    },
    {
      name: 'PC Tune-up',
      description: 'Our tune up service takes an in depth look at your PC to monitor where are the problem areas in your device that are hindering efficiency. From there we repair any issues reported and review duplicate files to get your device performing better than before.',
      price: 89.99
    },
    {
      name: 'Keyboard Cleaning',
      description: 'Increase the longevity of your keyboard through the removal of everyday grime. Our service removes dust, oils, and harmful residues from inside and outside your keyboard for the cleanest experience.',
      price: 45.00
    },
    {
      name: 'Disk Clean-up',
      description: 'Need space? Let us clear up any unnecessary clutter on your device so you can get back to using your device to its full potential.',
      price: 129.99
    }
  ];
}
