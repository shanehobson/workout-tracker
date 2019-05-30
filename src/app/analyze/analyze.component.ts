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
  trackerDates = [];

  currentDate: string;
  oneYearAgo: string;

  constructor(
    private exerciseService: ExerciseService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.setDateInformation();
    this.getExercisesForPastYear();
    this.trackerDates = this.constructTrackerDates();
    console.log(this.trackerDates);
  }

  setDateInformation() {
    this.currentDate = this.dateService.getCurrentDate();
    this.oneYearAgo = this.dateService.getCurrentDateMinusXDays(365);
  }

  getExercisesForPastYear() {
    this.exerciseService.getExercisesByDateRange(this.oneYearAgo, this.currentDate).then(response => {    
      const exercises = this.parseServerResponseIntoArray(response);
      console.log(exercises);
      this.exercises = exercises;
    });
  }

  constructTrackerDates(): Array<any> {
    const trackerDates = [];
    for (let i = 364; i >= 0; i--) {
      const date = this.dateService.getCurrentDateMinusXDays(i);
      trackerDates.push(date);
    }
    return trackerDates;
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
