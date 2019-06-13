import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ColorService {

  private calendarHoverState = new BehaviorSubject<CalendarHoverState>({
      hover: false
    });

  private colors = {
    $btGreen: '#88b068',
    $lightGreen: '#3CB371',
    $warrantyBlue: '#6596B7',
    $toyotaRed: '#cc2229',
    $purple: '#9102ff',
    $turquoise: '#00CED1',
    $yellow: '#F0E68C',
    $aqua: '#66CCCC',
    $skyBlue: '#499DF5',
    $gray: '#C0C0C0',
    $orange: '#FFA07A',
    $brown: '#BC8F8F',
    $aquaMarine: '#20B2AA',
    $pink: 'pink',
    $olive: '#808000'
  };

  private graphColorArray = [this.colors.$skyBlue, this.colors.$purple, this.colors.$lightGreen, '#e8c3b9', '#c45850', '#C0C0C0', this.colors.$olive, '#3e95cd', this.colors.$yellow, this.colors.$turquoise, this.colors.$btGreen];

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
    return this.graphColorArray;
  }
}

interface CalendarHoverState {
    hover: boolean;
  }