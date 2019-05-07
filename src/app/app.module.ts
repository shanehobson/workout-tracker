import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ExerciseService } from './services/exercise.service';
import { AuthService } from './services/auth.service';
import { CanActivateViaAuthGuard } from './services/canActivateAuth.service';
import { DateService } from './services/date.service';
import { ColorService } from './services/color.service';
import { Globals } from './globals';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecordComponent } from './record/record.component';
import { AnalyzeComponent } from './analyze/analyze.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RecordComponent,
    AnalyzeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [ Globals, ColorService, CanActivateViaAuthGuard, DateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
