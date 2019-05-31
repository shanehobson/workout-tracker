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

  exercises: Array<Exercise>;
  
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

   
}
