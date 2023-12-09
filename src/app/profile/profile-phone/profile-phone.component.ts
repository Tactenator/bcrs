import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SecurityService } from 'src/app/security/security.service';
import { UserService } from 'src/app/user-configuration/user.service';

@Component({
  selector: 'app-profile-phone',
  templateUrl: './profile-phone.component.html',
  styleUrls: ['./profile-phone.component.css']
})
export class ProfilePhoneComponent implements OnInit {
  @Input() user: User;

  phoneForm: FormGroup;
  showPhoneForm = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phoneNumber: [
        this.user.phoneNumber,
        Validators.compose([
          // Validators.required,
          Validators.pattern('^[0-9]{10}$'),
        ]),
      ]
    });
  }

  editPhone() {
    this.showPhoneForm = true;
  }

  onSubmit() {
    const phoneNumber = this.phoneForm.controls['phoneNumber'].value;
    this.userService.editUser({...this.user, phoneNumber})
      .subscribe(updatedUser => {
        this.showPhoneForm = false;
        const lastSignInDate = this.user.lastSignInDate;
        this.securityService.setUser({...updatedUser, lastSignInDate});
      });
  }
}
