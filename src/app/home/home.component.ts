import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User, AuthState } from '../../interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  authState: AuthState;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribeToAuthState();
  }

     // Auth State
     subscribeToAuthState(): void {
      this.authService.authState.subscribe((authState) => {
        if (!authState.loggedIn) {
          this.router.navigate(['/', 'login']);
        }
        this.authState = authState;
        // test
      })
    }

}
