/**
 * Title: user-edit.component.ts
 * Author: Tiffany Reyes
 * Date: 25 Nov 2023
 * Description: user edit component
 */

// importing class elements
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AddUserRequest } from 'src/app/models/add-user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: [''],
    });
  }

  createUser() {
    const formValues = this.createUserForm.value;

    const newUser: AddUserRequest = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      address: formValues.address,
      phoneNumber: formValues.phone,
      userId: formValues.userId,
      role: formValues.role,
    };

    this.userService.addUser(newUser)
      .subscribe(() => {
        this.router.navigate(['user-management']);
      });
  }
}


