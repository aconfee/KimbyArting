import { Component, Input } from '@angular/core';

import { PlaqueVm } from '../../viewModels/plaqueVm';

@Component({
  selector: 'project-plaque',
  templateUrl: './project-plaque.component.html',
  styleUrls: ['./project-plaque.component.scss']
})

export class ProjectPlaqueComponent {

  @Input('content') private plaque: PlaqueVm;
  @Input('numeral')
  set position(position: number) {
    this.numeral = this.getNumeral(position);
  }

  private numeral: string;

  private getNumeral(value: number): string {
    let numerals = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X' ];
    return numerals[value];
  }
}
