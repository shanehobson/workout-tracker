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

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService
  ) {
    
  }

  ngOnInit() {
    this.exerciseService.getUserData().then((userData: UserData) => {
      this.userData = userData;
      console.log(this.userData);
    });
  }

}
