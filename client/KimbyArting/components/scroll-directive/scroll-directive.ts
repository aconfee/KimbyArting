import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChange, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTo]'
})

export class ScrollToDirective implements OnChanges {

  @Input('scrollTo') scrollX: number;
  @Output() onScroll = new EventEmitter<number>();

  constructor(private el: ElementRef) {}

  // Our scroll will always be set to the parent provided value.
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('Scroll updated to ' + changes['scrollX'].currentValue);
    this.el.nativeElement.scrollLeft = changes['scrollX'].currentValue;
  }

  // Keep our scroll value up to date. Sent to parent.
  @HostListener('scroll')
  onAnyScroll() {
    this.scrollX = this.el.nativeElement.scrollLeft;
    this.onScroll.emit(this.el.nativeElement.scrollLeft);
  }
}
