import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
   loginUrl = '';
   private token: string;
   private loggedIn: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

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

  public login() {
      // login
  }

  public logout() {
      // logout
  }

  public get isLoggedIn(): boolean {
   return this.loggedIn;
  }

}
