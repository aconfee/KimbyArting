import { Component, AfterViewInit } from '@angular/core';

import '../../../../public/images/cover/logo.png';
import '../../../../public/images/cover/lightBlueBackground.png';
import '../../../../public/images/cover/egyptGirlCover.png';
import '../../../../public/images/cover/artstationIcon.png';
import '../../../../public/images/cover/facebookIcon.png';
import '../../../../public/images/cover/instagramIcon.png';
import '../../../../public/images/cover/tumblrIcon.png';
import '../../../../public/images/cover/twitterIcon.png';

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
    this.enter = true;
  }
}
