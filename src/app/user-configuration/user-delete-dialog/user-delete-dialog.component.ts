/**
 * Title: user-delete-dialog.component.ts
 * Author: Tiffany Reyes
 * Date: 25 Nov 2023
 * Description: user-delete-dialog component
 */

// importing class elements
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent {
  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<UserDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  deleteUser() {
    this.userService.deleteUser(this.data.user)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
