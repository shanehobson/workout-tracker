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
    loading: true
  };

  exercises: Array<Exercise>;

  bodyPartsGraph = {
    bodyParts: [],
    sets: []
  };
  
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
      this.constructBodyPartsGraph(exercises);
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

      this.bodyPartsGraph = this.filterTopTenBodyParts(bodyParts, sets);
  }

  parseExercisesIntoBodyPartsMap(exercises: Array<Exercise>): Array<any> {
    const bodyPartsMap = Object.create({});
    exercises.forEach(exercise => {
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

  filterTopTenBodyParts(bodyParts: Array<string>, sets: Array<number>) {
    const bodyPartsWithSets = bodyParts.map((bodyPart, i) => {
      return { bodyPart, sets: sets[i] };
    });

    const sortedArray = bodyPartsWithSets.sort((a, b) => {
      if (a.sets > b.sets) {
        return -1;
      } else {
        return 1;
      }
    });

    const topTenArray = sortedArray.slice(0, 10);
    
    bodyParts = topTenArray.map(el => el.bodyPart);
    sets = topTenArray.map(el => el.sets);
    return { bodyParts, sets };
  }

}
