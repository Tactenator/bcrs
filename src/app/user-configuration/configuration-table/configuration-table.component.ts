import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-configuration-table',
  templateUrl: './configuration-table.component.html',
  styleUrls: ['./configuration-table.component.css']
})
export class ConfigurationTableComponent implements OnInit {
  @Input() users: User[];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address', 'phoneNumber', 'actions'];
  dataSource: MatTableDataSource<User>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }
}
