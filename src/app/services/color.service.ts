import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ColorService {

  private calendarHoverState = new BehaviorSubject<CalendarHoverState>({ hover: false });

  private colors = {
    $btGreen: '#88b068',
    $green: '#6fa86f',
    $lightGreen: '#3CB371',
    $warrantyBlue: '#6596B7',
    $red: '#C25B56',
    $purple: '#BF5FFF',
    $turquoise: '#00CED1',
    $yellow: '#BDB76B',
    $aqua: '#66CCCC',
    $skyBlue: '#778899',
    $gray: '#C0C0C0',
    $orange: '#FFA07A',
    $brown: '#856363',
    $aquaMarine: '#20B2AA',
    $pink: '#FFB6C1',
    $olive: '#808000'
  };

  private graphColorArray = [this.colors.$skyBlue, this.colors.$purple, this.colors.$lightGreen, '#e8c3b9', this.colors.$aquaMarine, this.colors.$orange, this.colors.$brown, '#3e95cd', '#FF7F50', this.colors.$turquoise, this.colors.$btGreen];
  private pieChartColorArray = [this.colors.$green, this.colors.$red];
  private pieChartColorArray2 = [this.colors.$skyBlue, '#C0C0C0'];

 constructor(private router: Router){}

   getActivatedRoute(path){
        if (this.router.url === path) {
            return 'selected';
        } else {
            return '$tastyGrey';
        }
   } 

   getCalendarHoverState(): Observable<CalendarHoverState> {
    return this.calendarHoverState.asObservable();
  }

  pushCalendarHoverState(hover) {
    this.calendarHoverState.next({ hover });
  }

  getGraphColorArray() {
    return this.graphColorArray.concat(...this.graphColorArray).concat(...this.graphColorArray);
  }

  getPieChartColorArray() {
    return this.pieChartColorArray;
  }

  getPieChartColorArray2() {
    return this.pieChartColorArray2;
  }
}

interface CalendarHoverState {
    hover: boolean;
  }