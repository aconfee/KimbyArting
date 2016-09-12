import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { PortfolioDao } from '../dataContracts/portfolioDao';
import { ProjectVm } from '../viewModels/projectVm';

@Injectable()
export class PortfolioDataService {

  private portfolioData = null;

  constructor(private http: Http) {}

  public getProjects(i: number, j: number): ProjectVm[] {
    // TODO: Check upper bound.
    if(i < 0 || j < 0){
      console.error('Invalid indices provided to get project: (' + i + ', ' + j + ')');
    }

    return this.portfolioData.portfolio.categories[i].subcategories[j].projects as ProjectVm[];
  }

  public getCover(i: number, j: number): string {
    return this.portfolioData.portfolio.categories[i].subcategories[j].cover;
  }

  public getMenuSectionNames(): any {
    let menuSectionNames = [];
    for(var i in this.portfolioData.portfolio.categories){
      let subcategoryNames: string[] = [];
      for(var j in this.portfolioData.portfolio.categories[i].subcategories){
        subcategoryNames.push(
          this.portfolioData.portfolio.categories[i].subcategories[j].name.substring(3, this.portfolioData.portfolio.categories[i].subcategories[j].name.length)
        );
      }

      menuSectionNames.push({
        'categoryName': this.portfolioData.portfolio.categories[i].name.substring(3, this.portfolioData.portfolio.categories[i].name.length),
        'subcategories': subcategoryNames
      });
    }

    return menuSectionNames;
  }

  public getNextSectionIndices(i: number, j: number): any {
    j += 1;

    let subcategoryCount = this.portfolioData.portfolio.categories[i].subcategories.length;
    if(j >= subcategoryCount){
      i += 1;
      j = 0;
    }

    let categoryCount = this.portfolioData.portfolio.categories.length;
    if(i >= categoryCount){
      i = 0;
    }

    return { nextCategoryIndex: i, nextSubcategoryIndex: j };
  }

  public initPortfolioData(): Promise<any>{
    return this.http.get('portfolioData.json')
     .toPromise()
     .then((response) => {
        this.portfolioData = response.json();
     })
     .catch(this.handleError);
  }

  // Return all content in order listed in directory. Covers first.
  public getAllContent(): string[] {
    let imagePaths: string[] = [];

    for(let category of this.portfolioData.portfolio.categories){
      for(let subcategory of category.subcategories){
        if(subcategory.cover){
          imagePaths.push(subcategory.cover);
        }

        for(let project of subcategory.projects){
          if(project.imagePaths && project.imagePaths.length > 0){
            imagePaths = imagePaths.concat(project.imagePaths);
          }
        }
      }
    }

    return imagePaths;
  }

  public getPortfolioData(): Promise<any>{
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
