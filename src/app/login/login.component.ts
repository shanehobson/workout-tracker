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
      email: 'ron@swanson.swan',
      password: 'ronspword'
    }
    this.createUser(user);
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

}
