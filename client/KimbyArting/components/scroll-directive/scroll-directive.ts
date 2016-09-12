import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[galleryScroll]'
})

export class ScrollToDirective {

  trackpadEventTime: number = 0;
  wheelEventTime: number = 0;
  skipTrackpadUpdate: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('scroll')
  onScroll() {
    if(this.skipTrackpadUpdate === false){
      this.trackpadEventTime = Date.now();
    }
    else{
      this.skipTrackpadUpdate = false;
    }
  }

  @HostListener('wheel', ['$event.deltaY'])
  onScrollWheel(scrollDelta) {
    this.wheelEventTime = Date.now();

    // Could be accidental noise from trackpad.
    if(Math.abs(scrollDelta) <= 2){
      return;
    }

    // If the wheel was used exclusively (no trackpad event for a while).
    // This is because trackpad triggers both events, wheel only triggers one.
    if(Math.abs(this.wheelEventTime - this.trackpadEventTime) > 500){

      console.log('delta ' + scrollDelta);
      this.setScrollX(
        Math.min(
          this.el.nativeElement.scrollLeft + (scrollDelta / 2),
          this.el.nativeElement.scrollWidth)
      );

      // One time skip trackpad update since setting scrollX will trigger it.
      this.skipTrackpadUpdate = true;
    }
  }

  public setScrollX(scrollValue: number){
    this.el.nativeElement.scrollLeft = scrollValue;
  }
}
