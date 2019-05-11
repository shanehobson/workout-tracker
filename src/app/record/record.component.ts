import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  uiState = {
    showDateInput: false
  };

  date;
  dateForm: FormGroup;
  createLiftingExerciseForm: FormGroup;
  createCardioExerciseForm: FormGroup;

  bodyParts = this.exerciseService.bodyParts;

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
      reps: ['', Validators.required]
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

  toggleShowDateInput() {
    this.uiState.showDateInput = !this.uiState.showDateInput;
  }

  parseDateIntoNGB(date) {
    return {
        year: parseInt(date.slice(0, 4)),
        month: parseInt(date.slice(5, 7)),
        day: parseInt(date.slice(8, 10))
    }
  }

  parsedateIntoISO(date) {
    return `${date.year}-${date.month}-${date.day}`;
  }

  listenToDateFormChanges() {
    this.dateForm.controls.date.valueChanges.subscribe(val => {
      console.log(val);
      this.date = val;
    });
  }

}
