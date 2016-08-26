import { Component, AfterViewInit } from '@angular/core';

// Social.png is used in CSS. Not resolved by template loader.
import '../../../../public/images/cover/social.png';

@Component({
  selector: 'cover-page',
  templateUrl: './cover-page.component.html',
  styleUrls: ['./cover-page.component.scss']
})

export class CoverPageComponent implements AfterViewInit{
  enter: boolean;
  exit: boolean;
  requestSocialIcons: boolean;
  showSocialLinks: boolean;

  constructor(){
    this.enter = false;
    this.exit = false;
    this.requestSocialIcons = false;
    this.showSocialLinks = false;
  }

  ngAfterViewInit() {

    // Allow Egypt girl a tiny amount of time to load behind the scenes before animating.
    setTimeout(() => {
      this.enter = true;
    }, 200);
  }

  public ToggleSocialLinks(): void{

    // Icons display is set to none. We lazy load it icons.png on first click.
    if(this.requestSocialIcons === false){
      this.requestSocialIcons = true;
      console.log("remove display none");

      setTimeout(() => {
        this.showSocialLinks = true;
        console.log("begin transition");
      }, 20);

      return;
    }

    this.showSocialLinks = !this.showSocialLinks;
  }
}
