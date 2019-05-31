import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
import { HelperService } from '../services/helper.service';
import { BodyPart } from '../../interfaces/BodyPart';
import { Exercise } from '../../interfaces/Exercise';
import { TrackerDate } from '../../interfaces/TrackerDate';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  exercises: Array<Exercise>;
  trackerDates: Array<TrackerDate> = [];

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
      this.trackerDates = this.constructTrackerDates();
      console.log(this.trackerDates);
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

  constructTrackerDates(): Array<TrackerDate> {
    const datesArray: Array<string> = this.dateService.getOneYearAgoSundayToToday();
    const datesWithExercises = this.populateWithExercises(datesArray);
    const trackerDates: Array<TrackerDate> = this.populateWithColorScale(datesWithExercises);
    return trackerDates;
  }

  populateWithExercises(datesWithExercises: Array<string>): Array<any> {
    return datesWithExercises.map(date => {
      let exercises = this.exercises.filter(exercise => exercise.date.slice(0, 10) === date); 
      return { date, exercises };
    });
  }

  populateWithColorScale(datesArray: Array<any>): Array<any> {
    return datesArray.map(date => Object.assign(date, { colorScale: date.exercises.length }));
  }

  getColorScale(date: TrackerDate): string {
    if (date.colorScale === 0) {
      return 'tracker-item_none';
    } else if (date.colorScale < 2) {
      return 'tracker-item_low';
    } else if (date.colorScale < 4) {
      return 'tracker-item_medium';
    } else if (date.colorScale < 6) {
      return 'tracker-item_high';
    } else {
      return 'tracker-item_max';
    }
  }
   
}
