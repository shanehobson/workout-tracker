import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../services/exercise.service';
import { DateService } from '../services/date.service';
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
  trackerDates = [];

  currentDate: string;
  mostRecentSunday: string;
  mostRecentSundayMinusOneYear: string;

  constructor(
    private exerciseService: ExerciseService,
    private dateService: DateService
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
        const exercises = this.parseServerResponseIntoArray(response);
        resolve(exercises);
      });
    });
  }

  constructTrackerDates(): Array<TrackerDate> {
    const datesArray = this.getOneYearAgoSundayToToday();
    const trackerDates = this.populateWithExercises(datesArray);
    return trackerDates;
  }

  getOneYearAgoSundayToToday(): Array<string> {
    const dates = [];
    let hitOneYearAgoSunday = false;
    let i = 0;
    while (!hitOneYearAgoSunday) {
      const date = this.dateService.getCurrentDateMinusXDays(i);
      if (date === this.mostRecentSundayMinusOneYear) {
        hitOneYearAgoSunday = true;
        break;
      } else {
        dates.unshift(date);
        i++;
      }
    }
    return dates;
  }

  populateWithExercises(datesArray: Array<string>): Array<TrackerDate> {
    return datesArray.map(date => {
      let exercises = [];
      this.exercises.forEach(exercise => {
        if (exercise.date === date) {
          exercises.push(exercise);
        }
      });
      return { date, exercises };
    });
  }

  parseServerResponseIntoArray(response): Array<any> {
    let exercises = [];
    for (let key in response) {
      exercises.push(response[key]);
    }
    return exercises;
  }

  calculateOneYearAgo(currentDate: string): string {
    const currentDateArray = currentDate.split('');
    const oneYearAgoDateArray = currentDateArray.map((char, i) => {
      if (i === 3) {
        return (parseInt(char) - 1).toString();
      } else {
        return char;
      }
    });
    return oneYearAgoDateArray.join('');
  }
   
}
