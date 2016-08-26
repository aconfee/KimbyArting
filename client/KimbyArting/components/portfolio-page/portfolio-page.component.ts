import { Component, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements AfterViewInit{

  private images: string[];
  private thumbs: string[];
  private currentGallery: string = 'characters';
  private currentProject: string = 'spacePrincesses';

  constructor(private http: Http) { }

  ngAfterViewInit() {
    this.getData().then((data) => {
       this.images = data.gallery[this.currentGallery].projects[this.currentProject].images;
       this.thumbs = data.gallery[this.currentGallery].projects[this.currentProject].thumbs;
     });
  }

  getData(): Promise<any>{

    return this.http.get('sampledata.json')
     .toPromise()
     .then((response) => {
        return response.json();
     })
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
