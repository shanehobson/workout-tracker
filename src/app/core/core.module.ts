import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

// Components
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecordComponent } from '../record/record.component';
import { AnalyzeComponent } from '../analyze/analyze.component';
import { ExerciseItemComponent } from '../exercise-item/exercise-item.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RecordComponent,
    AnalyzeComponent,
    ExerciseItemComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ClickOutsideModule
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ClickOutsideModule
  ]
})
export class CoreModule { }
