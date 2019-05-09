import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDialog, MatDialogConfig } from '@angular/material';
import { MatFormField } from '@angular/material';
import { MatInput } from '@angular/material';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  date: string;
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
      date: [''],
    });
    this.createLiftingExerciseForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      sets: ['', Validators.required],
      reps: ['', Validators.required]
    });
    this.createCardioExerciseForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      miles: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.date = this.dateService.getTodaysDate();
    console.log(this.date);
    this.populateDateForm();
    this.listenToDateFormChanges();
  }

    /* Date Form */
    populateDateForm(): void {
      const date = moment(this.date).toDate();
      this.dateForm.controls['date'].setValue(date);
    }

    listenToDateFormChanges(): void {
      this.dateForm.valueChanges.subscribe(val => {
        this.date = this.dateService.parseDateIntoISO(val);
        console.log(this.date);
        // get exercises for this date
      });
    }

}
