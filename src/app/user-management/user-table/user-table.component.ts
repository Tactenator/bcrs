import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserTableService } from '../user-table.service';

export interface UserTableItem
  extends Pick<User, 'userId' | 'email' | 'firstName' | 'lastName'> {}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserTableItem>;
  displayedColumns = ['userId', 'firstName', 'lastName', 'email'];
  // dataSource: DataSource<UserTableItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<UserTableItem>;
  constructor(
    public userTableService: UserTableService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    userTableService.findUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data as UserTableItem[]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    // this.fetchUsers();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
