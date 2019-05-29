import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DateService } from '../services/date.service';
import { User, AuthState } from '../../interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  viewState = { // change before prod
    record: false,
    analyze: true
  }

  authState: AuthState;

  constructor(
    private authService: AuthService,
    private dateService: DateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribeToAuthState();
    
  }

  // View State 
  setView(view: string): void {
    for (let item in this.viewState) {
      if (item === view) {
        this.viewState[item] = true;
      } else {
        this.viewState[item] = false;
      } 
    }
  }

  isCurrentView(view: string): boolean {
    return this.viewState[view];
  }

  // Auth State
  subscribeToAuthState(): void {
  this.authService.authState.subscribe((authState) => {
    if (!authState.loggedIn) {
      this.router.navigate(['/', 'login']);
    }
    this.authState = authState;
  })
}

}
