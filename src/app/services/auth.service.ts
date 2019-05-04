import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
   createUserUrl = `${this.globals.serverUrl}/users`;
   loginUrl = `${this.globals.serverUrl}/users/login`;
   logoutUrl = `${this.globals.serverUrl}/users/logout`;
   logoutAllUrl = `${this.globals.serverUrl}/users/logoutAll`;
   getUserUrl = `${this.globals.serverUrl}/users/me`;
   updateUserUrl = `${this.globals.serverUrl}/users/me`;
   deleteUserUrl = `${this.globals.serverUrl}/users/me`;

   private token: string;
   private loggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private globals: Globals
  ) { }

  user: User;

  createUser(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(this.createUserUrl, user)
        .subscribe(response => {
          const token = response['token'];
          const { name, email } = response['user'];

          this.saveToken(token);

          const user: User = {
            name,
            email
          }

          this.user = user;

          resolve(user);
        }, err => {
          reject(err);
        });
    });
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(this.loginUrl, user, this.getRequestOptions())
        .subscribe(response => {
          const token = response['token'];
          const { name, email } = response['user'];

          this.saveToken(token);

          const user: User = {
            name,
            email
          }

          this.user = user;
          this.loggedIn = true;

          resolve(user);
        }, err => {
          reject(err);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.http.post(this.logoutUrl, {}, this.getRequestOptions())
        .subscribe(response => {

          this.saveToken('');
          this.user = null;
          this.loggedIn = false;

          resolve('Logged out.');
        }, err => {
          reject(err);
        });
    });
  }

  logoutAll() {
    return new Promise((resolve, reject) => {
      this.http.post(this.logoutAllUrl, {}, this.getRequestOptions())
        .subscribe(response => {

          this.saveToken('');
          this.user = null;
          this.loggedIn = false;

          resolve('Logged out of all sessions.');
        }, err => {
          reject(err);
        });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getUserUrl, this.getRequestOptions())
        .subscribe(response => {

          const user: User = {
            name: response['name'],
            email: response['email']
          }

          this.user = user;

          resolve(user);
        }, err => {
          reject(err);
        });
    });
  }

  updateUser(updates) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.updateUserUrl, updates, this.getRequestOptions())
        .subscribe(response => {

          const user: User = {
            name: response['name'],
            email: response['email']
          }

          this.user = user;

          resolve(user);
        }, err => {
          reject(err);
        });
    });
  }

  deleteUser() {
    return new Promise((resolve, reject) => {
      this.http.delete(this.deleteUserUrl, this.getRequestOptions())
        .subscribe(response => {

          this.saveToken('');
          this.user = null;
          this.loggedIn = false;

          resolve('User successfully deleted.');
        }, err => {
          reject(err);
        });
    });
  }

  public get isLoggedIn(): boolean {
    return this.loggedIn;
   }

  private saveToken(token: string): void {
    localStorage.setItem('workout-app-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('workout-app-token');
    }
    return this.token;
  }

  getRequestOptions() {
    return {
        headers: this.getHeadersWithAuthToken()                                                                                                                                                                               
    };
  }

  getHeadersWithAuthToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
  }

}
