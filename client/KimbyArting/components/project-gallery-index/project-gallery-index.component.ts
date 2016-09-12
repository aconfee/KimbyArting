import { Component, Input, Output, EventEmitter	} from '@angular/core';

@Component({
  selector: 'project-gallery-index',
  templateUrl: './project-gallery-index.component.html',
  styleUrls: ['./project-gallery-index.component.scss']
})

export class ProjectGalleryIndexComponent {

  @Input() private thumbs: string[];
  @Output() private onThumbSelected = new EventEmitter<number>();

  private hoveredIndex: number = -1;

  private thumbSelected(index: number): void {
    console.log('selected thumb: ' + index);
    this.onThumbSelected.emit(index);
  }

  private getNumeral(value: number): string {
    let numerals = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
      'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX' ];
    return numerals[value];
  }
}
