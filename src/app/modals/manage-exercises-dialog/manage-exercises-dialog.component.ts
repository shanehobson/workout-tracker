import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../../services/exercise.service';
import { HelperService } from '../../services/helper.service';
import { UserData } from '../../../interfaces/UserData';

@Component({
  selector: 'app-manage-exercises-dialog',
  templateUrl: './manage-exercises-dialog.component.html',
  styleUrls: ['./manage-exercises-dialog.component.scss']
})
export class ManageExercisesDialogComponent implements OnInit {

  uiState = {
    selectedExercise: '',
    selectedBodyPart: '',
    addExercise: '',
    addBodyPart: false
  }

  userData: UserData;
  liftingExercises: Array<string> = [];
  cardioExercises: Array<string> = [];
  bodyParts: Array<string> = [];
  bodyPartsMap;
  selectedExerciseBodyParts = [];

  editExerciseForm: FormGroup;
  editBodyPartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private helperService: HelperService
  ) {
    this.editExerciseForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.editBodyPartForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.exerciseService.getUserData().then((userData: UserData) => {
      this.parseUserData(userData);
    });
  }

  parseUserData(userData: UserData) {
    this.userData = userData;
    this.liftingExercises = userData.liftingExercises || [];
    this.cardioExercises = userData.cardioExercises || [];
    this.bodyParts = userData.bodyParts || [];
    this.bodyPartsMap = userData.bodyPartsMap;
  }

  onEditExerciseClicked(exercise: string) {
    this.uiState.addExercise = '';
    this.populateEditExerciseForm(exercise);
    this.toggleSelectedExercise(exercise);
  }

  /* Body Part Form, move later */
  onAddBodyPartClicked() {
    this.uiState.selectedBodyPart = '';
    this.uiState.addBodyPart = true;
    this.editBodyPartForm.controls.name.setValue('');
  }

  initBlankEditBodyPartForm() {
    this.editBodyPartForm.controls.name.setValue('');
  }

  submitAddBodyPartForm(formValue) {
    const updatedName = formValue.name;

    this.bodyParts.push(updatedName);

    this.exerciseService.updateUserData({ bodyParts: this.bodyParts }).then(() => {
      this.resetEditBodyPartsUI();
    });
  }

  resetEditBodyPartsUI() {
    this.editBodyPartForm.reset();
    this.uiState.selectedBodyPart = '';
    this.uiState.addBodyPart = false
  }

  toggleOpenedBodyPart(bodyPart: string) {
    this.uiState.selectedBodyPart = this.uiState.selectedBodyPart === bodyPart ? '' : bodyPart;
  }

  isBodyPartExpanded(bodyPart: string): boolean {
    return this.uiState.selectedBodyPart === bodyPart;
  }

  onEditBodyPartClicked(bodyPart: string) {
    this.uiState.addBodyPart = false;
    this.editBodyPartForm.controls.name.setValue(bodyPart);
    this.toggleOpenBodyPart(bodyPart);
  }

  toggleOpenBodyPart(bodyPart: string) {
    this.uiState.selectedBodyPart = this.uiState.selectedBodyPart === bodyPart ? '' : bodyPart;
  }

  removeBodyPart(bodyPart: string) {
    this.removeBodyPartsFromLocalData(bodyPart);

    this.exerciseService.updateUserData({ 
      bodyParts: this.bodyParts,
      bodyPartsMap: this.bodyPartsMap
    }).then((res) => {
      console.log(res);
    });
  }

  removeBodyPartsFromLocalData(bodyPart: string) {
    this.bodyParts = this.bodyParts.filter(item => item !== bodyPart);
    this.removeBodyPartFromBodyPartsMap(bodyPart);
  }

  removeBodyPartFromBodyPartsMap(bodyPart) {
    for (let exercise in this.bodyPartsMap) {
      const bodyParts = this.bodyPartsMap[exercise];
      const matchIndex = bodyParts.indexOf(bodyPart);

      if (matchIndex) {
        bodyParts.splice(matchIndex, 1);
      }
    }
  }

  onSubmitEditBodyPart(formValue) {
    const updatedName = formValue.name;
    const initialName = this.uiState.selectedBodyPart;

    this.updateBodyPartData(initialName, updatedName);

    this.exerciseService.updateUserData({ bodyParts: this.bodyParts, bodyPartsMap: this.bodyPartsMap }).then(() => {
      this.resetEditBodyPartsUI();
    });
  }

  updateBodyPartData(initialName: string, updatedName: string) {
    this.bodyParts = this.bodyParts.map(bodyPart => {
      if (bodyPart === initialName) {
        return updatedName;
      } else {
        return bodyPart;
      }
    });
  }
  // end of body parts form

  onAddExerciseClicked(type) {
    this.uiState.selectedExercise = '';
    this.initBlankEditExerciseForm();
    this.toggleAddExercise(type);
  }

  populateEditExerciseForm(exercise: string) {
    this.selectedExerciseBodyParts = this.getSelectedExerciseBodyParts(exercise);
    this.editExerciseForm.controls.name.setValue(exercise);
  }

  initBlankEditExerciseForm() {
    this.selectedExerciseBodyParts = this.getBodyPartsAsUnselected();
    this.editExerciseForm.controls.name.setValue('');
  }

  getSelectedExerciseBodyParts(exercise: string): Array<any> {
    return this.addUILogicToBodyParts(this.bodyParts, exercise);
  }

  getBodyPartsAsUnselected() {
    return this.bodyParts.map(bodyPart => ({
      bodyPart,
      selected: false
    }));
  }

  addUILogicToBodyParts(bodyParts: Array<string>, exercise: string) {
    const selectedBodyParts = this.bodyPartsMap[exercise];
    return bodyParts.map(bodyPart => ({
      bodyPart,
      selected: selectedBodyParts.includes(bodyPart)
    }));
  }

  // UI State
  toggleAddExercise(type) {
    this.uiState.addExercise = this.uiState.addExercise === type ? '' : type;
  }

  onBodyPartSelected(i: number) {
    this.editExerciseForm.markAsDirty();
    this.toggleSelectedBodyPart(i);
  }

  toggleSelectedBodyPart(i: number) {
    this.selectedExerciseBodyParts[i].selected = !this. selectedExerciseBodyParts[i].selected;
  }

  toggleSelectedExercise(exercise: string) {
    this.uiState.selectedExercise = this.uiState.selectedExercise === exercise ? '' : exercise;
  }

  isExpanded(exercise: string): boolean {
    return this.uiState.selectedExercise === exercise;
  }

  resetEditExerciseUI() {
    this.editExerciseForm.reset();
    this.uiState.selectedExercise = '';
    this.uiState.addExercise = '';
    this.selectedExerciseBodyParts = [];
  }

  // Lifting Form
  submitAddLiftingExerciseForm(formValue) {
    const updatedExerciseName = formValue.name;
    const bodyParts = this.filterSelectedExerciseBodyParts();

    this.addLiftingExerciseData(updatedExerciseName, bodyParts);

    this.exerciseService.updateUserData({ liftingExercises: this.liftingExercises, bodyPartsMap: this.bodyPartsMap }).then(() => {
      this.resetEditExerciseUI();
    });
  }

  addLiftingExerciseData(updatedExerciseName: string, bodyParts: Array<string>) {
    this.liftingExercises.unshift(updatedExerciseName);
    this.bodyPartsMap[updatedExerciseName] = bodyParts;
  }

  submitEditLiftingExerciseForm(formValue) {
    const updatedExerciseName = formValue.name;
    const bodyParts = this.filterSelectedExerciseBodyParts();
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

  removeLiftingExercise(exercise: string) {
    this.removeLiftingExerciseFromLocalData(exercise);

    this.exerciseService.updateUserData({ 
      liftingExercises: this.liftingExercises,
      bodyPartsMap: this.bodyPartsMap
    }).then((res) => {
      console.log(res);
    });
  }

  removeLiftingExerciseFromLocalData(exercise: string) {
    this.liftingExercises = this.liftingExercises.filter(item => item !== exercise);
    delete this.bodyPartsMap[exercise];
  }

  // Cardio Form
  submitAddCardioExerciseForm(formValue) {
    const updatedExerciseName = formValue.name;
    const bodyParts = this.filterSelectedExerciseBodyParts();

    this.addCardioExerciseData(updatedExerciseName, bodyParts);

    this.exerciseService.updateUserData({ cardioExercises: this.cardioExercises, bodyPartsMap: this.bodyPartsMap }).then(() => {
      this.resetEditExerciseUI();
    });
  }

  addCardioExerciseData(updatedExerciseName: string, bodyParts: Array<string>) {
    this.cardioExercises.unshift(updatedExerciseName);
    this.bodyPartsMap[updatedExerciseName] = bodyParts;
  }

  submitEditCardioExerciseForm(formValue) {
    const updatedExerciseName = formValue.name;
    const bodyParts = this.filterSelectedExerciseBodyParts();
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

  removeCardioExercise(exercise: string) {
    this.removeCardioExerciseFromLocalData(exercise);

    this.exerciseService.updateUserData({ 
      cardioExercises: this.cardioExercises,
      bodyPartsMap: this.bodyPartsMap
     }).then((res) => {
      console.log(res);
    });
  }

  removeCardioExerciseFromLocalData(exercise: string) {
    this.cardioExercises = this.cardioExercises.filter(item => item !== exercise);
    delete this.bodyPartsMap[exercise];
  }

  // Body Parts
  updateBodyPartsMap(initialExerciseName: string, updatedExerciseName: string, bodyParts: Array<string>) {
    const bodyPartsMap = this.bodyPartsMap;
    delete bodyPartsMap[initialExerciseName];
    bodyPartsMap[updatedExerciseName] = bodyParts;
    return bodyPartsMap;
  }

  filterSelectedExerciseBodyParts(): Array<string> {
    return this.selectedExerciseBodyParts.filter(bodyPart => bodyPart.selected).map(bodyPart => bodyPart.bodyPart);
  }

  // Utility Functions
  shortenExercise(exercise: string): string {
    return this.helperService.shortenString(exercise, 30);
  }

  shortenString(string) {
    return this.helperService.shortenString(string, 30);
  }

}
