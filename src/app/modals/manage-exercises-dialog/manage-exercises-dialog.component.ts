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

  uiState = {
    selectedExercise: ''
  }

  userData: UserData;
  liftingExercises: Array<string> = [];
  cardioExercises: Array<string> = [];
  bodyParts: Array<string> = [];
  bodyPartsMap;
  selectedExerciseBodyParts = [];

  editExerciseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService
  ) {
    this.editExerciseForm = this.fb.group({
      name: ['', Validators.required],
      bodyParts: [[]]
    });
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
    this.bodyPartsMap = userData.bodyPartsMap;
  }

  // UI State
  handleEditExercise(exercise) {
    this.populateEditExerciseForm(exercise);
    this.toggleselectedExercise(exercise);
  }

  populateEditExerciseForm(exercise: string) {
    this.selectedExerciseBodyParts = this.getSelectedExerciseBodyParts(exercise);
    this.editExerciseForm.controls.name.setValue(exercise);
  }

  getSelectedExerciseBodyParts(exercise: string): Array<any> {
    return this.addUILogicToBodyParts(this.bodyParts, exercise);
  }

  addUILogicToBodyParts(bodyParts: Array<string>, exercise: string) {
    const selectedBodyParts = this.bodyPartsMap[exercise];
    return bodyParts.map(bodyPart => ({
      bodyPart,
      selected: selectedBodyParts.includes(bodyPart)
    }));
  }

  onBodyPartSelected(i: number) {
    this.editExerciseForm.markAsDirty();
    this.toggleSelectedBodyPart(i);
  }

  toggleSelectedBodyPart(i: number) {
    this.selectedExerciseBodyParts[i].selected = !this. selectedExerciseBodyParts[i].selected;
  }

  toggleselectedExercise(exercise: string) {
    this.uiState.selectedExercise = this.uiState.selectedExercise === exercise ? '' : exercise;
  }

  isExpanded(exercise: string): boolean {
    return this.uiState.selectedExercise === exercise;
  }

  // Lifting Form
  submitEditLiftingExerciseForm(formValue) {
    const updatedExerciseName = formValue.name;
    const bodyParts = this.selectedExerciseBodyParts.filter(bodyPart => bodyPart.selected).map(bodyPart => bodyPart.bodyPart);
    const initialExerciseName = this.uiState.selectedExercise;

    this.editLiftingExerciseData(initialExerciseName, updatedExerciseName, bodyParts);

    this.exerciseService.updateUserData({ liftingExercises: this.liftingExercises, bodyPartsMap: this.bodyPartsMap }).then(() => {
      this.resetEditExerciseUI();
    });
  }

  editLiftingExerciseData(initialExerciseName: string, updatedExerciseName: string, bodyParts: Array<string>) {
    this.liftingExercises = this.updateLiftingExercises(initialExerciseName, updatedExerciseName);
    this.bodyPartsMap = this.updateBodyPartsMap(initialExerciseName, updatedExerciseName, bodyParts);
  }

  updateLiftingExercises(initialExerciseName: string, updatedExerciseName: string): Array<string> {
    return this.liftingExercises.map(exerciseName => {
      if (exerciseName === initialExerciseName) {
        return updatedExerciseName;
      } else {
        return exerciseName;
      }
    });
  }

  // Cardio Form
  onSubmitEditCardioExerciseForm(formValue) {
    const updatedExerciseName = formValue.name;
    const bodyParts = this.selectedExerciseBodyParts.filter(bodyPart => bodyPart.selected);
    const initialExerciseName = this.uiState.selectedExercise;

    this.editCardioExerciseData(initialExerciseName, updatedExerciseName, bodyParts);

    this.exerciseService.updateUserData({ cardioExercises: this.cardioExercises, bodyPartsMap: this.bodyPartsMap }).then(() => {
      this.resetEditExerciseUI();
    });
  }

  editCardioExerciseData(initialExerciseName: string, updatedExerciseName: string, bodyParts: Array<string>) {
    this.cardioExercises = this.updateCardioExercises(initialExerciseName, updatedExerciseName);
    this.bodyPartsMap = this.updateBodyPartsMap(initialExerciseName, updatedExerciseName, bodyParts);
  }

  updateCardioExercises(initialExerciseName: string, updatedExerciseName: string): Array<string> {
    return this.cardioExercises.map(exerciseName => {
      if (exerciseName === initialExerciseName) {
        return updatedExerciseName;
      } else {
        return exerciseName;
      }
    });
  }

  updateBodyPartsMap(initialExerciseName: string, updatedExerciseName: string, bodyParts: Array<string>) {
    const bodyPartsMap = this.bodyPartsMap;
    delete bodyPartsMap[initialExerciseName];
    bodyPartsMap[updatedExerciseName] = bodyParts;
    console.log(bodyPartsMap);
    return bodyPartsMap;
  }

  resetEditExerciseUI() {
    this.editExerciseForm.reset();
    this.uiState.selectedExercise = '';
    this.selectedExerciseBodyParts = [];
  }

  // CRUD Actions
  removeLiftingExercise(exercise: string) {
    this.removeLiftingExerciseFromLocalData(exercise);

    this.exerciseService.updateUserData({ 
      liftingExercises: this.liftingExercises,
      bodyPartsMap: this.bodyPartsMap
    }).then((res) => {
      console.log(res);
    });
  }

  removeCardioExercise(exercise: string) {
    this.cardioExercises = this.liftingExercises.filter(item => item !== exercise);
    delete this.bodyPartsMap[exercise];

    this.exerciseService.updateUserData({ 
      cardioxercises: this.cardioExercises,
      bodyPartsMap: this.bodyPartsMap
     }).then((res) => {
      console.log(res);
    });
  }

  removeLiftingExerciseFromLocalData(exercise: string) {
    this.liftingExercises = this.liftingExercises.filter(item => item !== exercise);
    delete this.bodyPartsMap[exercise];
  }

  // Utility Functions
  shortenExercise(exercise: string): string {
    if (exercise.length > 30) {
      return exercise.slice(0, 28) + '...';
    } else {
      return exercise;
    }
  }

}
