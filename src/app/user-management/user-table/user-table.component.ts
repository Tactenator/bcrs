import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserTableDataSource, UserTableItem } from './user-table-datasource';
import { User } from 'src/app/models/user';
import { UserTableService } from '../user-table.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserTableItem>;
  listUsers!: User[];
  constructor(private userTableService: UserTableService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  fetchUsers() {
    this.userTableService.findUsers().subscribe((data) => {
      this.listUsers = data;
      console.log('list of users', this.listUsers);
    });
  }
  ngOnInit(): void {
    this.fetchUsers();
  }
  displayedColumns = ['userId', 'firstName', 'lastName', 'email'];
  dataSource = new UserTableDataSource();
}
