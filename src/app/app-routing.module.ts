import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CanActivateViaAuthGuard } from './services/canActivateAuth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Protected Routes
  { path: 'home',
    component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
   // Home Component
   { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
