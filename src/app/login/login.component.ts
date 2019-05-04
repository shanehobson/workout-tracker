import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    const user: User = {
      name: 'Ron Swanson',
      email: 'testing@swanson.son',
      password: 'ronspword'
    }
  }

  createUser(user: User): void {
    this.authService.createUser(user).then((res) => {
      console.log(res);
       // If success, navigate to home page
    }).catch((err) => {
      console.log(err);
      // If failure, emit error message
    });
  }

  login(user: User): void {
    this.authService.login(user).then((res) => {
      console.log(res);
       // If success, navigate to home page
    }).catch((err) => {
      console.log(err);
      // If failure, emit error message
    });
  }

  logout(): void {
    this.authService.logout().then((res) => {
      console.log(res);
       // If success, navigate to login page
    }).catch((err) => {
      console.log(err);
       // If failure, console log error and navigate to login page
    });
  }

  logoutAll(): void {
    this.authService.logoutAll().then((res) => {
      console.log(res);
       // If success, navigate to login page
    }).catch((err) => {
      console.log(err);
      // If failure, console log error and navigate to login page
    });
  }

  getUser(): void {
    this.authService.getUser().then((res) => {
      console.log(res);
      // If success, navigate to login page
   }).catch((err) => {
     console.log(err);
     // If failure, console log error and navigate to login page
   });
  }

  updateUser(updates): void {
    this.authService.updateUser(updates).then((res) => {
      console.log(res);
      // If success, navigate to login page
   }).catch((err) => {
     console.log(err);
     // If failure, console log error and navigate to login page
   });
  }

  deleteUser(): void {
    this.authService.deleteUser().then((res) => {
      console.log(res);
      // If success, navigate to login page
   }).catch((err) => {
     console.log(err);
     // If failure, console log error and navigate to login page
   });
  }

}
