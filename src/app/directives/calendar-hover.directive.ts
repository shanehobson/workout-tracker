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

  @HostListener('mouseenter') onEnter() {
    console.log('enter');
    this.colorService.pushCalendarHoverState(true);
  }

  @HostListener('mouseexit') onExit() {
    console.log('exit);')
    this.colorService.pushCalendarHoverState(false);
  }

}
