/**
 * Title: employee-directory.component.ts
 * Author: William Austin
 * Date: 11/27/2023
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.css']
})
export class EmployeeDirectoryComponent {
  employees = [
    { name: 'Bob', position: 'Owner', imageUrl: './assets/bob-headshot.png' },
    { name: 'Diane', position: 'Chief Financial Officer', imageUrl: './assets/diane-headshot.png' },
    { name: 'Steven', position: 'Tech Lead', imageUrl: './assets/steven-headshot.png' },
    { name: 'Ryan', position: 'Technician', imageUrl: './assets/ryan-headshot.png' },
    { name: 'Heather', position: 'Customer Service', imageUrl: './assets/heather-headshot.png' },
    { name: 'Karl', position: 'Technician', imageUrl: './assets/karl-headshot.png' },
    // We can add more employees as needed
  ];
}

