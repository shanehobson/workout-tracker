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
    this.colorService.pushCalendarHoverState(true);
  }

  @HostListener('mouseout') onExit() {
    this.colorService.pushCalendarHoverState(false);
  }

}
