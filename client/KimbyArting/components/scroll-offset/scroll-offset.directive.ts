import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollOffset]'
})

export class ScrollOffsetDirective {

  constructor(private el: ElementRef) {}

  public getOffset(): number {
    return this.el.nativeElement.offsetLeft;
  }
}
