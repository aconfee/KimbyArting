import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements OnInit{

  private coverPhoto: string;
  private endPhoto: string;
  private images: string[] = [];
  private thumbs: string[] = [];
  private galleryCategory: string = 'characters';
  private gallerySpecialization: string = 'concept';

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.getData().then((data) => {

      this.coverPhoto = data.portfolio[this.galleryCategory][this.gallerySpecialization].cover;
      this.endPhoto = data.portfolio[this.galleryCategory][this.gallerySpecialization].end;

       let projects = data.portfolio[this.galleryCategory][this.gallerySpecialization].projects;
       for(var projectKey in projects){
          this.images = this.images.concat(projects[projectKey].images);
          this.thumbs = this.thumbs.concat(projects[projectKey].thumbs);
       }

     });
  }

  getData(): Promise<any>{
    return this.http.get('portfolioData.json')
     .toPromise()
     .then((response) => {
        console.log('returning data');
        return response.json();
     })
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
