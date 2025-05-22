import { Component, input } from '@angular/core';
import { Preparation, PreparationInstace } from '../../../../shared/models/Preparation.interface';

@Component({
  selector: 'app-preparation-item',
  imports: [],
  templateUrl: './preparation-item.component.html',
  styleUrl: './preparation-item.component.scss'
})
export class PreparationItemComponent {
  public item = input<Preparation>(new PreparationInstace());
}
