import { UserTableService } from './../user-table.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
//service created to retrieve data from the server (see user.service.ts)
//new service created to retrieve data from the server

export interface UserTableItem {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

// TODO: replace this with real data from your application
const USER_DATA: UserTableItem[] = [
  {
    userId: '1980',
    firstName: 'Patrick',
    lastName: 'Cuauro',
    email: 'pcuauronava@my365.bellevue.edu',
  },
  {
    userId: '1987',
    firstName: 'Liseth',
    lastName: 'Avila',
    email: 'lisethavila@home.com',
  },
  {
    userId: '2013',
    firstName: 'Paul',
    lastName: 'Cuauro',
    email: 'pauldcuauro@home.com',
  },
  {
    userId: '2019',
    firstName: 'Rebecca',
    lastName: 'Cuauro',
    email: 'rebeccacuauro@home.com',
  },
  {
    userId: '2021',
    firstName: 'Samantha',
    lastName: 'Cuauro',
    email: 'samanthacuauro@home.com',
  },
];

// const TEST_DATA: UserTableItem = UserTableService.findUsers();
// ^?

/**
 * Data source for the UserTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserTableDataSource extends DataSource<UserTableItem> {
  data: UserTableItem[] = USER_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserTableItem[]): UserTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserTableItem[]): UserTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'userId':
          return compare(+a.userId, +b.userId, isAsc);
        case 'firstName':
          return compare(+a.firstName, +b.firstName, isAsc);
        case 'lastName':
          return compare(+a.lastName, +b.lastName, isAsc);
        case 'email':
          return compare(+a.email, +b.email, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
