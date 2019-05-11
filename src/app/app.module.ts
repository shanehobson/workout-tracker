
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

// Services
import { ExerciseService } from './services/exercise.service';
import { AuthService } from './services/auth.service';
import { CanActivateViaAuthGuard } from './services/canActivateAuth.service';
import { DateService } from './services/date.service';
import { ColorService } from './services/color.service';
import { Globals } from './globals';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AngularMaterialModule,
    CoreModule
  ],
  providers: [ Globals, ColorService, CanActivateViaAuthGuard, DateService ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
