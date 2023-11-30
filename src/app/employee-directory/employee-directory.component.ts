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
    { name: 'Bob', position: 'Owner', description: "Experienced entrepreneur leading Bob's Computer Repair with a passion for providing top-notch tech solutions and excellent customer service.",imageUrl: './assets/bob-headshot.png' },
    { name: 'Diane', position: 'Chief Financial Officer', description:"Diane manages finances with precision, ensuring stability and growth. Her expertise guides Bob's Computer Repair toward financial success.", imageUrl: './assets/diane-headshot.png' },
    { name: 'Steven', position: 'Tech Lead', description:"Tech virtuoso Steven drives innovation, overseeing projects and ensuring cutting-edge solutions for Bob's Computer Repair.",imageUrl: './assets/steven-headshot.png' },
    { name: 'Ryan', position: 'Technician', description:"Dedicated technician Ryan troubleshoots and repairs with expertise, guaranteeing seamless tech solutions for Bob's Computer Repair customers.", imageUrl: './assets/ryan-headshot.png' },
    { name: 'Heather', position: 'Customer Service', description:"Heather excels in customer service, ensuring satisfaction at every interaction. She's the friendly face of Bob's Computer Repair.",imageUrl: './assets/heather-headshot.png' },
    { name: 'Karl', position: 'Technician', description:"Karl, a skilled technician, tackles technical challenges head-on, delivering reliable solutions for Bob's Computer Repair and its clients.", imageUrl: './assets/karl-headshot.png' },
    // We can add more employees as needed
  ];
}

