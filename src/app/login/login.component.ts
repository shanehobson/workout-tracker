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
    createUserError: false,
    view: 'login',
    createUserErrorMessage: 'Unable to create user profile.'
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
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }

  ngOnInit() {
    this.subscribeToAuthState();

    this.getUser().then((res) => {
      this.router.navigate(['/', 'home']);
    }).catch((err) => {
      console.log('User not authenticated.');
    })
  }

  // Form Submission 
  submitLoginForm(form): void {
    const { name, password } = form;
    const user: User = { name, password };

    this.resetUIErrorState();

    this.login(user).then(res => {
      console.log(res);
      this.router.navigate(['/home']);
    })
    .catch((err) => {
      console.log(err);
      this.uiState.loginError = true;
    })
  }

  submitCreateUserForm(form): void {
    const { name, email, password } = form;
    const user: User = { name, email, password };

    this.resetUIErrorState();

    this.createUser(user).then(res => {
      console.log(res);
      this.router.navigate(['home']);
    })
    .catch((err) => {
      console.log(err);
      this.uiState.createUserError = true;
    })
  }

  // CRUD Operations
  createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.createUser(user).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  login(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.login(user).then((res) => {
        resolve(res);
     }).catch((err) => {
       reject(err);
     });
    })
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

  isTouchedInvalid(formName: string, controlName: string) {
    const controlTouched = this[formName].controls[controlName].touched;
    const controlValid = this[formName].controls[controlName].valid;
    return controlTouched && !controlValid;
  }

  // UI and View State
  toggleViewState(view): void {
    this.resetForms();
    this.resetUIErrorState();
    this.uiState.view = view;
  }

  resetForms(): void {
    this.loginForm.reset();
    this.createUserForm.reset();
  }

  resetUIErrorState(): void {
    this.uiState.loginError = false;
    this.uiState.createUserError = false;
  }

   // Auth State
   subscribeToAuthState(): void {
    this.authService.authState.subscribe((authState) => {
      this.authState = authState;
    })
  }

}
