import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ExerciseService } from '../../services/exercise.service';
import { BodyPart } from '../../../interfaces/bodyPart';
import { Exercise } from '../../../interfaces/exercise';
import { UserData } from '../../../interfaces/UserData';

@Component({
  selector: 'app-manage-exercises-dialog',
  templateUrl: './manage-exercises-dialog.component.html',
  styleUrls: ['./manage-exercises-dialog.component.scss']
})
export class ManageExercisesDialogComponent implements OnInit {

  userData: UserData;
  liftingExercises: Array<string> = [];
  cardioExercises: Array<string> = [];
  bodyParts: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService
  ) {
    
  }

  ngOnInit() {
    this.exerciseService.getUserData().then((userData: UserData) => {
      this.parseUserData(userData);
      console.log(this.userData);
    });
  }

  parseUserData(userData) {
    this.userData = userData;
    this.liftingExercises = userData.liftingExercises || [];
    this.cardioExercises = userData.cardioExercises || [];
    this.bodyParts = userData.bodyParts || [];

    console.log(this.liftingExercises);
   }

}
