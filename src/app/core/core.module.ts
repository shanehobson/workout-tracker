import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { SharedModule } from '../shared/shared.module';

// Components
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecordComponent } from '../record/record.component';
import { AnalyzeComponent } from '../analyze/analyze.component';
import { YearTrackerComponent } from '../analyze/year-tracker/year-tracker.component';
import { BodyPartsGraphComponent } from '../analyze/body-parts-graph/body-parts-graph.component';
import { ExercisesGraphComponent } from '../analyze/exercises-graph/exercises-graph.component';
import { LiftingCardioComparisonGraphComponent } from '../analyze/lifting-cardio-comparison-graph/lifting-cardio-comparison-graph.component';
import { UpperLowerBodyComparisonGraphComponent } from '../analyze/upper-lower-body-comparison-graph/upper-lower-body-comparison-graph.component';
import { ExerciseItemComponent } from '../record/exercise-item/exercise-item.component';
import { ManageExercisesDialogComponent } from '../modals/manage-exercises-dialog/manage-exercises-dialog.component';

// Directives
import { CalendarHoverDirective } from '../directives/calendar-hover.directive';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RecordComponent,
    AnalyzeComponent,
    ExerciseItemComponent,
    CalendarHoverDirective,
    YearTrackerComponent,
    ManageExercisesDialogComponent,
    BodyPartsGraphComponent,
    ExercisesGraphComponent,
    LiftingCardioComparisonGraphComponent,
    UpperLowerBodyComparisonGraphComponent
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
    ClickOutsideModule,
    SharedModule
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
    ClickOutsideModule,
    CalendarHoverDirective
  ],
  entryComponents: [ ManageExercisesDialogComponent ]
})
export class CoreModule { }
