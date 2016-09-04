import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ScrollToDirective }  from '../scroll-directive/scroll-directive';

@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements OnInit {

  @ViewChild(ScrollToDirective) private galleryScrollDirective: ScrollToDirective;

  private portfolioData;

  private coverPhotoVm: string;
  private endPhotoVm: string;
  private imagesVm: string[] = [];
  private thumbsVm: string[] = [];

  private projects: any = [];

  // TODO: this will be moved into or passed into menu component
  private categoriesVm: any[] = [];

  private expandedCategory: number;
  private activeCategory: number;
  private activeSubcategory: number;

  constructor(private http: Http) {}

  ngOnInit() {

    this.getData().then((data) => {
      this.portfolioData = data;

      // TODO: Use a service to get and parse data for us. This component should ONLY deal
      // with VMs.
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

      this.expandedCategory = 0;
      this.activeCategory = 0;
      this.activeSubcategory = 0;

      this.setGallery(0, 0);
    });
  }

  getNumeral(value: number): string {
    let numerals = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X' ];
    return numerals[value];
  }

  nextSection(): void {
    let categoryIndex = this.activeCategory;
    let subcategoryIndex = this.activeSubcategory;

    subcategoryIndex += 1;

    let categoryKey = Object.keys(this.portfolioData.portfolio)[this.activeCategory];
    let subcategoryCount = Object.keys(this.portfolioData.portfolio[categoryKey]).length;
    console.log('sub index: ' + subcategoryIndex + ' count: ' + subcategoryCount);
    if(subcategoryIndex >= subcategoryCount){
      categoryIndex += 1;
      subcategoryIndex = 0;
    }

    let categoryCount = Object.keys(this.portfolioData.portfolio).length;
    console.log('main index: ' + categoryIndex + ' count: ' + categoryCount);
    if(categoryIndex >= categoryCount){
      console.log('reset to 0');
      categoryIndex = 0;
    }

    this.setGallery(categoryIndex, subcategoryIndex);
  }

  setGallery(categoryIndex: number, subcategoryIndex: number): void{
    this.activeCategory = categoryIndex;
    this.expandedCategory = categoryIndex;
    this.activeSubcategory = subcategoryIndex;

    let category = Object.keys(this.portfolioData.portfolio)[categoryIndex];
    let subcategory = Object.keys(this.portfolioData.portfolio[category])[subcategoryIndex];

    this.coverPhotoVm = null;
    this.endPhotoVm = null;
    this.coverPhotoVm = this.portfolioData.portfolio[category][subcategory].cover;
    this.endPhotoVm = this.portfolioData.portfolio[category][subcategory].end;

    this.imagesVm = [];
    this.thumbsVm = [];
     let projects = this.portfolioData.portfolio[category][subcategory].projects;
     for(var projectKey in projects){
        this.imagesVm = this.imagesVm.concat(projects[projectKey].images);
        this.thumbsVm = this.thumbsVm.concat(projects[projectKey].thumbs);
     }

     this.projects = this.portfolioData.portfolio[category][subcategory].projects;

     this.galleryScrollDirective.setScrollX(0);
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
