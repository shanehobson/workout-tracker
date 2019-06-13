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

  private graphColorArray = [this.colors.$skyBlue, this.colors.$purple, this.colors.$green, this.colors.$yellow, this.colors.$red, '#C0C0C0'];

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
}

interface CalendarHoverState {
    hover: boolean;
  }