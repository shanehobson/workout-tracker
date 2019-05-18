import { Directive, ElementRef, HostListener } from '@angular/core';
import { ColorService } from '../services/color.service';

@Directive({
  selector: '[appCalendarHover]'
})
export class CalendarHoverDirective {

  constructor(
    private el: ElementRef,
    private colorService: ColorService
  ) { }

  @HostListener('mouseover') onEnter() {
    console.log('enter');
    this.colorService.pushCalendarHoverState(true);
  }

  @HostListener('mouseout') onExit() {
    console.log('exit');
    this.colorService.pushCalendarHoverState(false);
  }

}
