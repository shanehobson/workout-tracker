import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
import { HelperService } from '../services/helper.service';
import { BodyPart } from '../../interfaces/BodyPart';
import { Exercise } from '../../interfaces/Exercise';
import { YearTrackerDate } from '../../interfaces/YearTrackerDate';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  uiState = {
    loading: true,
    noData: false
  };

  exercises: Array<Exercise>;

  bodyPartsGraph = {
    bodyParts: [],
    sets: []
  };

  exercisesGraph = {
    exercises: [],
    sets: []
  };

  exerciseComparisonGraph = [0, 0];
  upperLowerBodyComparisonGraph = [0, 0];
  
  currentDate: string;
  mostRecentSunday: string;
  mostRecentSundayMinusOneYear: string;

  constructor(
    private exerciseService: ExerciseService,
    private dateService: DateService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.setDateInformation();
    this.getExercisesForPastYear().then((exercises) => {
      this.exercises = exercises;
      if (exercises.length === 0) {
        this.uiState.noData = true;
      }
      this.constructBodyPartsGraph(exercises);
      this.constructExercisesGraph(exercises);
      this.constructExerciseComparisonGraph(exercises);
      this.constructUpperLowerBodyComparisonGraph(exercises);
      this.uiState.loading = false;
    });
  }

  setDateInformation() {
    this.currentDate = this.dateService.getCurrentDate();
    this.mostRecentSunday = this.dateService.getMostRecentSunday();
    this.mostRecentSundayMinusOneYear = this.dateService.getMostRecentSundayMinusOneYear();
  }

  getExercisesForPastYear(): Promise<Array<Exercise>> {
    return new Promise((resolve) => {
      this.exerciseService.getExercisesByDateRange(this.mostRecentSundayMinusOneYear, this.currentDate).then(response => {    
        const exercises = this.helperService.parseServerResponseIntoArray(response);
        resolve(exercises);
      });
    });
  }

  constructBodyPartsGraph(exercises: Array<Exercise>): void {
      const bodyPartsMap = this.parseExercisesIntoBodyPartsMap(exercises);
      const bodyParts = [];
      const sets = [];

      for (let item in bodyPartsMap) {
        bodyParts.push(item);
        sets.push(bodyPartsMap[item]);
      }
      const { items, amounts } = this.helperService.filterTopXItems(bodyParts, sets, 10);
      this.bodyPartsGraph = { bodyParts: items, sets: amounts }
  }

  parseExercisesIntoBodyPartsMap(exercises: Array<Exercise>): Array<any> {
    const bodyPartsMap = Object.create({});
    exercises.forEach(exercise => {

      if (exercise.type === 'cardio') {
        exercise.sets = 1;
      }
            
      exercise.bodyParts.forEach(bodyPart => {
        if (bodyPartsMap[bodyPart]) {
          bodyPartsMap[bodyPart] += exercise.sets;
        } else {
          bodyPartsMap[bodyPart] = exercise.sets;
        }
      });
    });

    return bodyPartsMap;
  }

  constructExercisesGraph(exercisesArray: Array<Exercise>): void {
    const exercisesMap = this.parseExercisesIntoExerciseMap(exercisesArray);
    const exercises = [];
    const sets = [];

    for (let item in exercisesMap) {
      exercises.push(item);
      sets.push(exercisesMap[item]);
    }
    const { items, amounts } = this.helperService.filterTopXItems(exercises, sets, 10);
    this.exercisesGraph = {exercises: items, sets: amounts }
  }

  parseExercisesIntoExerciseMap(exercises: Array<Exercise>): Array<any> {
    const exerciseMap = Object.create({});
    exercises.forEach(exercise => {

      if (exercise.type === 'cardio') {
        exercise.sets = 1;
      }

      if (exerciseMap[exercise.name]) {
        exerciseMap[exercise.name] += exercise.sets;
      } else {
        exerciseMap[exercise.name] = exercise.sets;
      }
    });

    return exerciseMap;
  }

  constructExerciseComparisonGraph(exercises: Array<Exercise>): void {
    let lifting = 0;
    let cardio = 0;

    exercises.forEach(exercise => {
      if (exercise.type === 'weights') {
        lifting++;
      } else if (exercise.type === 'cardio') {
        cardio++;
      }
    });

    this.exerciseComparisonGraph = [lifting, cardio];
  }

  constructUpperLowerBodyComparisonGraph(exercises: Array<Exercise>): void {
    let upper = 0;
    let lower = 0;

    exercises.forEach(exercise => {
      if (exercise.bodyParts.includes('Legs')) {
        lower++;
      } else if (exercise.bodyParts.length > 0) {
        upper++;
      }
    });

    this.upperLowerBodyComparisonGraph = [upper, lower];
  }
}
