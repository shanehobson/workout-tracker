import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';
import { ColorService } from '../services/color.service';
import { DateService } from '../services/date.service';
import { BodyPart } from '../../interfaces/bodyPart';
import { Exercise } from '../../interfaces/exercise';
import { UserData } from '../../interfaces/UserData';
import { CalendarHoverDirective } from '../directives/calendar-hover.directive';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  uiState = {
    showDateInput: false,
    showForm: '',
    successMessage: '',
    errorMessage: '',
    calendarHover: false,
    exerciseBeingEdited: '',
    addExerciseInput: ''
  };

  exercises;
  defaultExerciseObject = {
    sets: 0,
    reps: 0,
    miles: 0
  }

  // Data for select boxes
  bodyParts = [];
  liftingExercises: Array<string> = [];
  cardioExercises: Array<string> = [];

  date;
  dateForm: FormGroup;
  createLiftingExerciseForm: FormGroup;
  createCardioExerciseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private dateService: DateService,
    private colorService: ColorService
  ) { 
    this.dateForm = this.fb.group({
      date: [{}, Validators.required]
    });
    this.createLiftingExerciseForm = this.fb.group({
      name: ['', Validators.required],
      sets: [0, Validators.required],
      reps: [0, Validators.required],
      bodyParts: [[]],
      addExercise: [''],
      addBodyPart: ['']
    });
    this.createCardioExerciseForm = this.fb.group({
      name: ['', Validators.required],
      miles: [0, Validators.required],
      bodyParts: [[]],
      addExercise: [''],
      addBodyPart: ['']
    });
  }

  ngOnInit() {
    this.date = this.parseDateIntoNGB(this.dateService.getCurrentDate());
    this.getExercisesByDate(this.date);
    this.dateForm.controls.date.setValue(this.date);
    this.getUserData();
    this.listenToDateFormChanges();
    this.subscribeToCalendarHoverState();
  }

  // UI State
  toggleShowDateInput() {
   this.uiState.showDateInput = !this.uiState.showDateInput;
    this.uiState = Object.assign(this.uiState, {
      showForm: '',
      successMessage: '',
      errorMessage: ''
    });
  }

  toggleAddExerciseForm(type) {
    this.clearSuccessAndErrorMessages();
    if (this.uiState.showForm === type) {
      this.uiState.showForm = '';
    } else {
      this.resetExerciseData();
      this.uiState.showForm = type;
    }
  }

  openEditExerciseForm(exercise: Exercise) {
    if (exercise.type === 'weights') {
      const { name, sets, reps, bodyParts } = exercise;
      this.createLiftingExerciseForm.setValue({ name, sets, reps, bodyParts });
    } else {
      const { name, miles, bodyParts } = exercise;
      this.createCardioExerciseForm.setValue({ name, miles, bodyParts });
    }

    this.uiState = Object.assign(this.uiState, {
      showForm: exercise.type,
      exerciseBeingEdited: exercise._id,
      showDateInput: false,
      successMessage: '',
      errorMessage: ''
    });
  }

  subscribeToCalendarHoverState() {
    const component = this;
    this.colorService.getCalendarHoverState().subscribe({
      next(state) {
        component.uiState.calendarHover = state.hover;
      }
    });
  }

  activeFormView(type): boolean {
    return this.uiState.showForm === type;
  }

  toggleSelectBodyPart(i) {
    this.bodyParts[i].selected = !this.bodyParts[i].selected;
  }

  closeDatepicker(e) {
    for (let item of e.target.classList) {
      if (item === 'date-picker-button' || item.includes('ngb') || item.includes('custom-select')) { return; }
    }

    this.uiState = Object.assign(this.uiState, {
      showDateInput: false
    });
  }

  setSuccessMessage(successMessage) {
    this.uiState = Object.assign(this.uiState, {
      successMessage,
      errorMessage: ''
    });
  }

  setErrorMessage(errorMessage) {
    this.uiState = Object.assign(this.uiState, {
      successMessage: '',
      errorMessage
    });
  }

  clearSuccessAndErrorMessages(){
    this.uiState = Object.assign(this.uiState, {
      successMessage: '',
      errorMessage: ''
    });
  }

  toggleAddExerciseInput(type) {
    this.uiState.addExerciseInput = this.uiState.addExerciseInput === type ? '' : type;
  }

  // Exercise Forms
  submitExercise(form, type) {
    this.clearSuccessAndErrorMessages();

    const exercise = Object.assign(this.defaultExerciseObject, form);
    exercise['date'] = this.parseDateIntoExtendedISO(this.date);
    exercise['bodyParts'] = this.unParseBodyParts(this.bodyParts);
    exercise['type'] = type;

    if (this.uiState.exerciseBeingEdited) {
      exercise['_id'] = this.uiState.exerciseBeingEdited;
      this.editExercise(exercise).then(() => {
        this.resetExerciseData();
        this.getExercisesByDate(this.date);
      })
    } else {
      this.addExercise(exercise).then(() => {
        this.resetExerciseData();
        this.getExercisesByDate(this.date);
      });
    }
  }

  addExercise(exercise): Promise<boolean> {
    return new Promise((resolve) => {
      this.exerciseService.addExercise(exercise).then((res) => {
        this.setSuccessMessage('Exercise added!');
        this.uiState.showForm = '';
        resolve(true);
      }).catch(e => {
          this.setErrorMessage('Unable to add exercise due to network or server error.');
          resolve(false)
      });
    });
  }

  editExercise(exercise: Exercise): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const id = exercise._id;
      delete exercise.createdAt;
      delete exercise._id;
  
      this.exerciseService.updateExercise(id, exercise).then((res) => {
        this.setSuccessMessage('Exercise added!');
        this.uiState.showForm = '';
        resolve(true);
      });
    });
  }

  deleteExercise(exercise: Exercise) {
    const id = exercise._id;
    delete exercise.createdAt;
    delete exercise._id;

    this.exerciseService.deleteExercise(id).then((res) => {
      this.getExercisesByDate(this.date);
    });
  }

  addExerciseToUserData(type) {
    if (type === 'lifting') {
      const exercise = this.createLiftingExerciseForm.controls.addExercise.value;
      this.liftingExercises.push(exercise);
      this.createLiftingExerciseForm.controls.name.setValue(exercise);
      this.createLiftingExerciseForm.controls.addExercise.setValue('');
      this.updateUserData({ liftingExercises: this.liftingExercises })
    } else if (type === 'cardio') {
      const exercise = this.createCardioExerciseForm.controls.addExercise.value;
      this.cardioExercises.push(exercise);
      this.createCardioExerciseForm.controls.name.setValue(exercise);
      this.createCardioExerciseForm.controls.addExercise.setValue('');
      this.updateUserData({ cardioExercises: this.cardioExercises })
    }
    this.uiState.addExerciseInput = '';
  }

  getExercises() {
    this.exerciseService.getExercises().then((exercises) => {
      this.exercises = this.sortExercises(exercises);
    });
  }

  getExercisesByDate(date) {
    const today = this.parseDateIntoExtendedISO(date);
    this.exerciseService.getExercisesByDateRange(today, today).then((exercises) => {
      this.exercises = this.sortExercises(exercises);
    })
    .catch( e => {
      console.log(e)
    });
  }

  getUserData() {
    this.exerciseService.getUserData().then((userData: UserData) => {
      const { bodyParts, liftingExercises, cardioExercises } = userData;
      this.bodyParts = this.parseBodyParts(bodyParts);
      this.liftingExercises = liftingExercises;
      this.cardioExercises = cardioExercises;
    });
  }

  updateUserData(updates: UserData) {
    this.exerciseService.updateUserData(updates).then((res) => {
      console.log(res);
    });
  }

  resetExerciseData() {
    this.createLiftingExerciseForm.reset();
    this.createCardioExerciseForm.reset();
    this.bodyParts.forEach(bodyPart => bodyPart.selected = false);
    this.uiState.exerciseBeingEdited = '';
  }

  sortExercises(exercises) {
    return exercises.sort((a, b) => {
      const aDate = this.stripDashes(a.createdAt);
      const bDate = this.stripDashes(b.createdAt);
      return aDate > bDate;
    });
  }

  // Date form
  listenToDateFormChanges() {
    this.dateForm.controls.date.valueChanges.subscribe(val => {
      this.date = val;
      this.getExercisesByDate(this.date);
    });
  }

  // Helper functions
  isFormFieldPopulated(form: FormGroup, field: string): boolean {
    return !form.controls[field].value;
  }

  parseBodyParts(bodyParts: Array<string>): Array<BodyPart> {
    return bodyParts.map(bodyPart => {
      return { bodyPart, selected: false };
    });
  }

  unParseBodyParts(bodyParts: Array<BodyPart>): Array<string> {
    const filteredArray = bodyParts.filter(el => el.selected);
    return filteredArray.map(el => el.bodyPart)
  }

  parseDateIntoNGB(date) {
    return {
        year: parseInt(date.slice(0, 4)),
        month: parseInt(date.slice(5, 7)),
        day: parseInt(date.slice(8, 10))
    }
  }

  parseDateIntoISO(date) {
    const month = this.addLeadingZero(date.month);
    const day = this.addLeadingZero(date.day);
    return `${date.year}-${month}-${day}`;
  }

  parseDateIntoExtendedISO(date) {
    const month = this.addLeadingZero(date.month);
    const day = this.addLeadingZero(date.day);
    return `${date.year}-${month}-${day}T00:00:00.000Z`;
  }

  addLeadingZero(num) {
    const str = num.toString();
    return str.length === 1 ? `0${str}` : str;
  }

  stripDashes(input: string): number {
    const year = input.slice(0, 4);
    const month = input.slice(5, 7);
    const day = input.slice(8, 10);
    return parseInt(`${year}${month}${day}`);
  }  

}
