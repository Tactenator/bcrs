import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SecurityService } from 'src/app/security/security.service';
import { UserService } from 'src/app/user-configuration/user.service';

@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.css']
})
export class ProfileAddressComponent implements OnInit {
  @Input() user: User;
  @Output() addressUpdated = new EventEmitter<void>();

  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      address: [
        this.user.address
      ]
    });
  }

  onSubmit() {
    const address = this.addressForm.controls['address'].value;
    this.userService.editUser({...this.user, address})
      .subscribe(updatedUser => {
        this.addressUpdated.emit();
        this.securityService.setUser(updatedUser);
      });
  }
}
