import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// this is the http client module that we need to retrieve data from the server
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';
import { str } from 'ajv';
import * as e from 'express';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserTableService {
  //   private users: User[] = [];
  //   private usersUpdated = new Subject<User[]>();
  //passing a payload of type UserModel[]

  constructor(private http: HttpClient) {}

  findUsers(){
    return this.http.get<User[]>('http://localhost:3000/api/users');
  }
}
