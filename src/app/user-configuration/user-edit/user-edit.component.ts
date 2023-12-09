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
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  updateUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.route.snapshot.paramMap.get('userId'));

    this.user$.subscribe(user => {
      this.user = user;

      this.updateUserForm = this.fb.group({
        firstName: [user.firstName],
        lastName: [user.lastName],
        email: [user.email],
        address: [user.address],
        phone: [user.phoneNumber],
      });
    })

  }

  updateUser() {
    const formValues = this.updateUserForm.value;

    const updatedUser: User = {
      _id: this.user._id,
      userId: this.user.userId,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      address: formValues.address,
      phoneNumber: formValues.phone,
      password: this.user.password,
      isDisabled: this.user.isDisabled,
      role: this.user.role,
    };

    this.userService.adminEditUser(updatedUser)
      .subscribe(() => {
        this.router.navigate(['user-management']);
      });
  }
}
