import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements OnInit{

  private portfolioData;

  private coverPhotoVm: string;
  private endPhotoVm: string;
  private imagesVm: string[] = [];
  private thumbsVm: string[] = [];

  // TODO: Clean this hack.
  private showContact: boolean = false;

  // TODO: this will be moved into or passed into menu component
  private categoriesVm: any[] = [];

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.getData().then((data) => {
      this.portfolioData = data;

      // TODO: this will be passed into menu component
      for(var categoryKey in this.portfolioData.portfolio){
        let subcategoriesVm: string[] = [];
        for(var subcategory in this.portfolioData.portfolio[categoryKey]){
          subcategoriesVm.push(subcategory.substring(3, subcategory.length));
        }

        this.categoriesVm.push({
          'name': categoryKey.substring(3, categoryKey.length),
          'subcategories': subcategoriesVm
        });
      }

      this.setGallery(0, 0);
    });
  }

  setGallery(categoryIndex: number, subcategoryIndex: number): void{
    // TODO: Clean this hack!
    this.showContact = false;

    let category = Object.keys(this.portfolioData.portfolio)[categoryIndex];
    let subcategory = Object.keys(this.portfolioData.portfolio[category])[subcategoryIndex];

    this.coverPhotoVm = this.portfolioData.portfolio[category][subcategory].cover;
    this.endPhotoVm = this.portfolioData.portfolio[category][subcategory].end;

    this.imagesVm = [];
    this.thumbsVm = [];
     let projects = this.portfolioData.portfolio[category][subcategory].projects;
     for(var projectKey in projects){
        this.imagesVm = this.imagesVm.concat(projects[projectKey].images);
        this.thumbsVm = this.thumbsVm.concat(projects[projectKey].thumbs);
     }
  }

  getData(): Promise<any>{
    return this.http.get('portfolioData.json')
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
