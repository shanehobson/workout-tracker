import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, AuthState } from '../../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  views = {
    login: 'login',
    createUser: 'createUser'
  };

  uiState = {
    loginError: false,
    view: 'login'
  };

  authState: AuthState;

  loginForm: FormGroup;
  createUserForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['']
    });
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['']
    });
   }

  ngOnInit() {
    this.subscribeToAuthState();
    // this.login({
    //     name: 'Shane',
    //     email: 'testing@shane.shane',
    //     password: 'TestingPword69'
    //   });

    this.getUser().then((user) => {
      console.log('Logged in');
      this.router.navigate(['home']);
    }).catch(() => {
      console.log('Not logged in');
    })
  }

  subscribeToAuthState(): void {
    this.authService.authState.subscribe((authState) => {
      this.authState = authState;
    })
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
       // If success, navigate to home page
    }).catch((err) => {
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

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getUser().then((res) => {
        resolve(res);
     }).catch((err) => {
       reject(err);
     });
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

  // UI and View State
  toggleViewState(view): void {
    this.resetForms();
    this.uiState.view = view;
  }

  resetForms(): void {
    this.loginForm.reset();
    this.createUserForm.reset();
  }

}
