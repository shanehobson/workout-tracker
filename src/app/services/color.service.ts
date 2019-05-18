import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ColorService {

    private calendarHoverState = new BehaviorSubject<CalendarHoverState>({
        hover: false
      });

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
}

interface CalendarHoverState {
    hover: boolean;
  }