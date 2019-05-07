import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  createLiftingExerciseForm: FormGroup;
  createCardioExerciseForm: FormGroup;

  bodyParts = this.exerciseService.bodyParts;

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService
  ) { 
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
  }

}
