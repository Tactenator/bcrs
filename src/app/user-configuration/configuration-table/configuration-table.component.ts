import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration-table',
  templateUrl: './configuration-table.component.html',
  styleUrls: ['./configuration-table.component.css']
})
export class ConfigurationTableComponent implements OnInit {
  @Input() users: User[];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address', 'phoneNumber', 'isDisabled', 'actions'];
  dataSource: MatTableDataSource<User>;
  deleteDialogRef: MatDialogRef<UserDeleteDialogComponent>;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }

  deleteUser(user: User) { // deleting user
    this.deleteDialogRef = this.dialog.open(UserDeleteDialogComponent, {
      data: { user },
      width: '500px'
    });
  }

  editUser(userId: string) { // editing user
    this.router.navigate(['user-management', userId])
  }
}
