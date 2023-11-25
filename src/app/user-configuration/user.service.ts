import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// this is the http client module that we need to retrieve data from the server
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = 'http://localhost:3000/api/users';

  private users: User[] = [];
  private _users = new BehaviorSubject<User[]>(this.users);
  users$: Observable<User[]> = this._users.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl)
      .pipe(
        tap(users => {
          this.users = users;
          this._users.next(this.users);
        })
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userApiUrl, user)
      .pipe(
        tap(user => {
          this.users.push(user);
          this._users.next(this.users);
        })
      );
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userApiUrl}/${user._id}`, user)
      .pipe(
        tap(updatedUser => {
          this.users = this.users.map(user => {
            if (user._id === updatedUser._id) {
              user = updatedUser;
            }

            return user;
          });

          this._users.next(this.users);
        })
      );
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.userApiUrl}/${user._id}`)
      .pipe(
        tap(() => {
          this.users = this.users.map(user => {
            if (user._id === user._id) {
              user = {...user, isDisabled: true};
            }

            return user;
          });

          this._users.next(this.users);
        })
      );
  }
}
