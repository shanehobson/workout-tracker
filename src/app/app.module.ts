import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CanActivateViaAuthGuard } from './services/canActivateAuth.service';
import { ColorService } from './services/color.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [  ColorService, CanActivateViaAuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
