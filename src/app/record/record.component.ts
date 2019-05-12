import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
import { BodyPart } from '../../interfaces/bodyPart';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  uiState = {
    showDateInput: false,
    showForm: ''
  };

  date;
  dateForm: FormGroup;
  createLiftingExerciseForm: FormGroup;
  createCardioExerciseForm: FormGroup;

  bodyParts = this.parseBodyParts(this.exerciseService.bodyParts);
  defaultExerciseObject = {
    sets: 0,
    reps: 0,
    miles: 0
  }

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    private dateService: DateService
  ) { 
    this.dateForm = this.fb.group({
      date: [{}, Validators.required]
    });
    this.createLiftingExerciseForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      sets: ['', Validators.required],
      reps: ['', Validators.required],
      bodyParts: [[]]
    });
    this.createCardioExerciseForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      miles: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.date = this.parseDateIntoNGB(this.dateService.getTodaysDate());
    this.dateForm.controls.date.setValue(this.date);
    this.listenToDateFormChanges();
  }

  // UI State
  toggleShowDateInput() {
    this.uiState.showDateInput = !this.uiState.showDateInput;
  }

  toggleAddExerciseForm(type) {
    this.uiState.showForm = this.uiState.showForm === type ? '' : type;
  }

  activeFormView(type): boolean {
    return this.uiState.showForm === type;
  }

  toggleSelectBodyPart(i) {
    this.bodyParts[i].selected = !this.bodyParts[i].selected;
  }

  // Helper functions
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
    return `${date.year}-${date.month}-${date.day}`;
  }

  // Exercise Forms
  submitExercise(form, type) {
    const exercise = Object.assign(this.defaultExerciseObject, form);
    exercise['date'] = this.parseDateIntoISO(this.date);
    exercise['bodyParts'] = this.unParseBodyParts(this.bodyParts);
    exercise['type'] = type;
    this.exerciseService.addExercise(exercise).then((res) => {
      console.log(res);
    })
      .catch(e => {
        console.log(e);
    });
  }

  // Date form
  listenToDateFormChanges() {
    this.dateForm.controls.date.valueChanges.subscribe(val => {
      console.log('Selected date: ' + val);
      this.date = val;
    });
  }

}
