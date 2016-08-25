import { Component, AfterViewInit } from '@angular/core';



@Component({
  selector: 'cover-page',
  templateUrl: './cover-page.component.html',
  styleUrls: ['./cover-page.component.scss']
})

export class CoverPageComponent implements AfterViewInit{
  enter: boolean;
  exit: boolean;
  showSocialLinks: boolean;

  constructor(){
    this.enter = false;
    this.exit = false;
    this.showSocialLinks = false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.enter = true;
    }, 200);
  }
}
