import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { ProjectGalleryComponent }  from '../project-gallery/project-gallery.component';
import { ProjectVm } from '../../viewModels/projectVm';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements OnInit {

  @ViewChild(ProjectGalleryComponent) private projectGalleryComponent: ProjectGalleryComponent;

  private galleryCoverImagePath: string;
  private projects: ProjectVm[] = [];

  // TODO: this will be moved into or passed into menu component
  private menuSectionNames: any[] = [];

  private expandedCategory: number;
  private activeCategory: number;
  private activeSubcategory: number;

  constructor(private portfolioDataService: PortfolioDataService) {}

  ngOnInit() {

    this.portfolioDataService.initPortfolioData().then(() => {
      this.expandedCategory = 0;
      this.activeCategory = 0;
      this.activeSubcategory = 0;

      this.menuSectionNames = this.portfolioDataService.getMenuSectionNames();
      this.setGallery(0, 0);
    });
  }

  private onNextSection(): void {
    let nextIndices = this.portfolioDataService.getNextSectionIndices(this.activeCategory, this.activeSubcategory);
    this.setGallery(nextIndices.nextCategoryIndex, nextIndices.nextSubcategoryIndex);
  }

  setGallery(categoryIndex: number, subcategoryIndex: number): void{
    this.activeCategory = categoryIndex;
    this.expandedCategory = categoryIndex;
    this.activeSubcategory = subcategoryIndex;

    this.galleryCoverImagePath = this.portfolioDataService.getCover(categoryIndex, subcategoryIndex);
    this.projects = this.portfolioDataService.getProjects(categoryIndex, subcategoryIndex);

    this.projectGalleryComponent.setScrollX(0);
  }
}
