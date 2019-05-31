import { Component, OnChanges, Input } from '@angular/core';
import { DateService } from '../../services/date.service';
import { Exercise } from '../../../interfaces/Exercise';
import { YearTrackerDate } from '../../../interfaces/YearTrackerDate';

@Component({
  selector: 'app-year-tracker',
  templateUrl: './year-tracker.component.html',
  styleUrls: ['./year-tracker.component.scss']
})
export class YearTrackerComponent implements OnChanges {

  @Input() exercises: Array<Exercise>;
  @Input() currentDate: string;
  @Input() mostRecentSunday: string;
  @Input() mostRecentSundayMinusOneYear: string;

  yearTrackerDates: Array<YearTrackerDate> = [];

  constructor(private dateService: DateService) { }

  ngOnChanges() {
    if (this.exercises) {
      this.yearTrackerDates = this.constructYearTrackerDates();
      console.log(this.yearTrackerDates);
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

  populateWithColorScale(datesArray: Array<any>): Array<any> {
    return datesArray.map(date => Object.assign(date, { colorScale: date.exercises.length }));
  }

  getColorScale(date: YearTrackerDate): string {
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
