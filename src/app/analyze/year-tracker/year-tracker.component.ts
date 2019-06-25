import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DateService } from '../../services/date.service';
import { Exercise } from '../../../interfaces/Exercise';
import { YearTrackerDate } from '../../../interfaces/YearTrackerDate';

@Component({
  selector: 'app-year-tracker',
  templateUrl: './year-tracker.component.html',
  styleUrls: ['./year-tracker.component.scss']
})
export class YearTrackerComponent implements OnInit, OnChanges {

  @Input() exercises: Array<Exercise>;
  @Input() currentDate: string;
  @Input() mostRecentSunday: string;
  @Input() mostRecentSundayMinusOneYear: string;

  yearTrackerDates: Array<YearTrackerDate> = [];
  lastTwelveMonths: Array<string> = [];
  daysOfWeek = ['Mon', 'Wed', 'Fri'];

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.lastTwelveMonths = this.dateService.getLastTwelveMonths();
  }

  ngOnChanges() {
    if (this.exercises) {
      this.yearTrackerDates = this.constructYearTrackerDates();
    }
  }

  constructYearTrackerDates(): Array<YearTrackerDate> {
    const datesArray: Array<string> = this.dateService.getOneYearAgoSundayToToday();
    const datesWithExercises = this.populateWithExercises(datesArray);
    const yearTrackerDates: Array<YearTrackerDate> = this.populateWithColorScale(datesWithExercises);
    return yearTrackerDates;
  }

  populateWithExercises(datesWithExercises: Array<string>): Array<any> {
    return datesWithExercises.map(date => {
      let exercises = this.exercises.filter(exercise => exercise.date.slice(0, 10) === date); 
      return { date, exercises };
    });
  }

  populateWithColorScale(datesArray: Array<any>): Array<YearTrackerDate> {
    return datesArray.map(date => Object.assign(date, { colorScale: date.exercises.length }));
  }

  getNumberOfDaysWithExercise(): number {
    const daysWithExercise = this.yearTrackerDates.filter(date => date.exercises.length > 0);
    return daysWithExercise.length;
  }

  userHasExercisedThisYear(): boolean {
    return !!(this.getNumberOfDaysWithExercise());
  }

  getDateOfFirstExercise(): string {
    let dateOfFirstExercise = '';
    this.yearTrackerDates.forEach(item => {

      if (!dateOfFirstExercise) {

        if (item.exercises.length > 0) {
          dateOfFirstExercise = item.date;
        }
      }
    });

    return dateOfFirstExercise;
  }

  // Directive-Related Functions
  getColorScale(date: YearTrackerDate): string {
    if (date.colorScale === 0) {
      return 'tracker-item_none';
    } else if (date.colorScale < 2) {
      return 'tracker-item_low';
    } else if (date.colorScale < 5) {
      return 'tracker-item_medium';
    } else if (date.colorScale < 7) {
      return 'tracker-item_high';
    } else {
      return 'tracker-item_max';
    }
  }

  getXAxisPosition(): string {
    const dayOfMonth: number = this.dateService.getCurrentDayOfMonth();
    if (dayOfMonth > 20) {
      return 'x-axis_left';
    } else if (dayOfMonth < 20 && dayOfMonth > 9) {
      return 'x-axis_center';
    } else {
      return 'x-axis_right';
    }
  }
}
