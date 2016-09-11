import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges	} from '@angular/core';

import { ScrollToDirective }  from '../scroll-directive/scroll-directive';
import { ProjectVm } from '../../viewModels/projectVm';

@Component({
  selector: 'project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss']
})

export class ProjectGalleryComponent implements OnChanges {

  @Input('cover') private coverImagePath: string;
  @Input() private projects: ProjectVm[];
  @Output() private onNextSection = new EventEmitter<any>();
  @ViewChild(ScrollToDirective) private galleryScrollDirective: ScrollToDirective;

  private isLoading: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

    // Show load indicator when loading, and fade in when done loading. Waits for cover or first image.
    if(changes['projects']){
      this.isLoading = true;

      if(this.coverImagePath !== null){
        let img = new Image ();
        img.addEventListener('load', () => {
          this.isLoading = false;
        });
        img.src = this.coverImagePath;
      }
      else if(this.projects && this.projects.length > 0 && this.projects[0].imagePaths.length > 0){
        let img = new Image ();
        img.addEventListener('load', () => {
          this.isLoading = false;
        });
        img.src = this.projects[0].imagePaths[0];
      }
      else{
        this.isLoading = false;
      }
    }
  }

  public setScrollX(scrollX: number): void {
    this.galleryScrollDirective.setScrollX(scrollX);
  }

  private nextSection() {
    this.onNextSection.emit();
  }
}
