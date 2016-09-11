import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { ProjectGalleryComponent }  from '../project-gallery/project-gallery.component';
import { NavigationMenuComponent }  from '../navigation-menu/navigation-menu.component';
import { ProjectVm } from '../../viewModels/projectVm';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})

export class PortfolioPageComponent implements OnInit {

  @ViewChild(ProjectGalleryComponent) private projectGalleryComponent: ProjectGalleryComponent;
  @ViewChild(NavigationMenuComponent) private navigationMenuComponent: NavigationMenuComponent;
  private galleryCoverImagePath: string;
  private projects: ProjectVm[] = [];
  private menuSectionNames: any[] = [];

  private currentCategory: number = 0;
  private currentSubcategory: number = 0;

  constructor(private portfolioDataService: PortfolioDataService) {}

  ngOnInit() {
    this.portfolioDataService.initPortfolioData().then(() => {

      // Load first project images.
      let imagePaths: string[] = this.portfolioDataService.getAllContent();
      this.preload(imagePaths, 0);

      this.menuSectionNames = this.portfolioDataService.getMenuSectionNames();
      this.setGallery(0, 0);
    });
  }

  private preload(imageArray: string[], i: number): void {
    let index = i || 0;

    let img;
    if (imageArray && index < imageArray.length) {
      img = new Image ();
      img.onload = () => {
          this.preload(imageArray, index + 1);
      };

      img.src = imageArray[index];
    }
  }

  // Event sent from project-gallery.
  private onNextSection(): void {
    let nextIndices = this.portfolioDataService.getNextSectionIndices(this.currentCategory, this.currentSubcategory);

    this.currentCategory = nextIndices.nextCategoryIndex;
    this.currentSubcategory = nextIndices.nextSubcategoryIndex;

    this.navigationMenuComponent.setActiveSection(this.currentCategory, this.currentSubcategory);
    this.setGallery(this.currentCategory, this.currentSubcategory);
  }

  // Event sent from navigation-menu.
  private onChangeSection(indices: number[]): void {
    this.currentCategory = indices[0];
    this.currentSubcategory = indices[1];

    this.setGallery(this.currentCategory, this.currentSubcategory);
  }

  setGallery(categoryIndex: number, subcategoryIndex: number): void{
    this.galleryCoverImagePath = null;
    this.projects = [];

    this.galleryCoverImagePath = this.portfolioDataService.getCover(categoryIndex, subcategoryIndex);
    this.projects = this.portfolioDataService.getProjects(categoryIndex, subcategoryIndex);

    this.projectGalleryComponent.setScrollX(0);
  }
}
