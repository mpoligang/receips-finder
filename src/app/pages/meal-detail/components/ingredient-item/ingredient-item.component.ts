import { Component, input, signal, SimpleChanges } from '@angular/core';
import { Ingredient, IngredientInstance } from '../../../../shared/models/Ingredients.interface';

@Component({
  selector: 'app-ingredient-item',
  imports: [],
  templateUrl: './ingredient-item.component.html',
  styleUrl: './ingredient-item.component.scss'
})
export class IngredientItemComponent {

  public item = input<Ingredient>(new IngredientInstance());

  public imageLoaded = signal(false);
  public imageOnError = signal(false);


  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && changes['item'].currentValue !== changes['item'].previousValue) {
      this.resetValues();
      this.handleLoadingImage();
    }
  }

  private handleLoadingImage(): void {
    const img = new Image();
    img.src = this.item().thumbs.small;
    img.onload = () => {
      this.imageOnError.set(false);
      this.imageLoaded.set(true);
    };
    img.onerror = () => {
      this.imageOnError.set(true);
    };
  }

  private resetValues(): void {
    this.imageOnError.set(false);
    this.imageLoaded.set(false);
  }


}
