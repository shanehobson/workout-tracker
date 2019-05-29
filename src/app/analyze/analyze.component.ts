import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
import { BodyPart } from '../../interfaces/bodyPart';
import { Exercise } from '../../interfaces/exercise';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  exercises: Array<Exercise>;

  constructor(
    private exerciseService: ExerciseService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.getExercises();
  }

  getExercises() {
    this.exerciseService.getExercises().then(response => {
      let exercises = [];
      for (let key in response) {
        exercises.push(response[key]);
      }
      console.log(exercises);
      this.exercises = exercises;
    });
   
  }
}
