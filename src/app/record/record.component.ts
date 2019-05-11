import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  // @ViewChild('dateElement') dateElement: ElementRef;

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
      // date: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      sets: ['', Validators.required],
      reps: ['', Validators.required]
    });
    this.createCardioExerciseForm = this.fb.group({
      // date: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      miles: ['', Validators.required]
    });
  }

  ngOnInit() {
    const ngbDate = this.parseDateIntoNGB(this.dateService.getTodaysDate());
    this.dateForm.controls.date.setValue(ngbDate);
    console.log(this.date);
  }

  parseDateIntoNGB(date) {
    return {
        year: parseInt(date.slice(0, 4)),
        month: parseInt(date.slice(5, 7)),
        day: parseInt(date.slice(8, 10))
    }
  }

  onDateSelect() {
    console.log(this.date);
  }

}
