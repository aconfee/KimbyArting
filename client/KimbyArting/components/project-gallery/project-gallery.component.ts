import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ScrollToDirective }  from '../scroll-directive/scroll-directive';
import { ProjectVm } from '../../viewModels/projectVm';

@Component({
  selector: 'project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss']
})

export class ProjectGalleryComponent {

  @Input('cover') private coverImagePath: string;
  @Input() private projects: ProjectVm[];
  @Output() private onNextSection = new EventEmitter<any>();
  @ViewChild(ScrollToDirective) private galleryScrollDirective: ScrollToDirective;

  private showGallery: boolean = true;

  public setScrollX(scrollX: number): void {
    this.galleryScrollDirective.setScrollX(scrollX);
  }

  private nextSection() {
    this.onNextSection.emit();
  }

  public setVisible(show: boolean): void {
    this.showGallery = show;
  }

}
