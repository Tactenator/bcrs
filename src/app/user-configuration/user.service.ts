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
  private _users = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();
  //passing a payload of type UserModel[]

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/users')
      .pipe(
        tap(users => {
          this._users.next(users);
        })
      );
  }

  getUsers2() {
    this.http
      .get<{ message: string; users: any }>(
        // this the method necessary to retrieve data from the server
        'http://localhost:3000/api/users'
      )
      .pipe(
        map((userData) => {
          return userData.users.map((user: { userId: any; firstName: any; lastName: any; }) => {
            return {
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
            };
          });
        })
      )
      .subscribe((transformedUsers) => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
    //return an observable
  }

  addUser(userId: string, firstName: string, lastName: string) {
    const user: User = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        isDisabled: false,
        role: ''
    };
    this.http
      .post<{ message: string; userId: string }>(
        'http://localhost:3000/api/users',
        user
      )
      .subscribe((responseData) => {
        const id = responseData.userId;
        user.userId = id;
        // console.log(responseData.message);
        //responseData is named arbitrarily
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        //passing a copy of the array
      });
  }

  deleteUser(userId: string) {
    this.http
      .delete('http://localhost:3000/api/users/' + userId)
      .subscribe(() => {
        const updatedUsers = this.users.filter(
          (user) => user.userId !== userId
        );
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  retrieveTasks() {
    // doneTasks: user.doneTasks
    throw new Error('Method not implemented.');
  }
}
