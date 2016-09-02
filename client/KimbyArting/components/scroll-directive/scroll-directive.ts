import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[galleryScroll]'
})

export class ScrollToDirective {

  constructor(private el: ElementRef) {}

  // Keep our scroll value up to date. Sent to parent.
  //@HostListener('scroll')
  //onScrollWheel() {

  //}

  setScrollX(scrollValue: number){
    this.el.nativeElement.scrollLeft = scrollValue;
  }
}
