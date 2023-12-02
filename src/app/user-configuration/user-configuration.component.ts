/**
 * Title: user-configuration.component.ts
 * Author: Tiffany Reyes
 * Date: 25 Nov 2023
 * Description: user configuration component
 */

// importing class elements

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css']
})
export class UserConfigurationComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  users$ = this.userService.users$;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(data => {
        console.log(data); // the latest data
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
