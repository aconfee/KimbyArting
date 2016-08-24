import { Component, AfterViewInit } from '@angular/core';

import '../../../../public/images/cover/lightBlueBackground.png';
import '../../../../public/images/cover/egyptGirlCover.png';
import '../../../../public/images/cover/logo.png';

@Component({
  selector: 'cover-page',
  templateUrl: './cover-page.component.html',
  styleUrls: ['./cover-page.component.scss']
})

export class CoverPageComponent implements AfterViewInit{
  enter: boolean;
  exit: boolean;

  constructor(){
    this.enter = false;
    this.exit = false;
  }

  ngAfterViewInit() {
    this.enter = true;
  }
}
