import { Component, AfterViewInit } from '@angular/core';


@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements AfterViewInit{

  domain: string = 'http://localhost:3000'

  images: string[] = [
    this.domain + '/assets/egyptGirlCover.png',
    this.domain + '/assets/egyptGirlCover.png',
    this.domain + '/assets/egyptGirlCover.png',
    this.domain + '/assets/egyptGirlCover.png',
    this.domain + '/assets/egyptGirlCover.png',
    this.domain + '/assets/egyptGirlCover.png'
  ];


  constructor() { }

  ngAfterViewInit() {

  }


}
