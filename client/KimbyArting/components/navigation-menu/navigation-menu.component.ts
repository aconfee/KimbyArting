import { Component, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})

export class NavigationMenuComponent {

  private expandedCategory: number = 0;
  private activeCategory: number = 0;
  private activeSubcategory: number = 0;

  @Input('menuLinks') private menuSectionNames: any[];
  @Output() private onChangeSection = new EventEmitter<number[]>();

  constructor(private portfolioDataService: PortfolioDataService) {}

  private selectSection(categoryIndex: number, subcategoryIndex: number): void{
    this.activeCategory = categoryIndex;
    this.activeSubcategory = subcategoryIndex;

    this.onChangeSection.emit([categoryIndex, subcategoryIndex]);
  }

  private isExpanded(categoryIndex: number): boolean {
    return this.expandedCategory === categoryIndex;
  }

  public setActiveSection(categoryIndex: number, subcategoryIndex: number): void {
    this.expandedCategory = categoryIndex;
    this.activeCategory = categoryIndex;
    this.activeSubcategory = subcategoryIndex;
  }
}
