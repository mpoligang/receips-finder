import { Component, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-meal-item',
  imports: [ButtonModule, TagModule],
  templateUrl: './meal-item.component.html',
  styleUrl: './meal-item.component.scss'
})
export class MealItemComponent implements OnChanges {

  public title = input<string>('');
  public height = input<string>('');
  public favorite = input<boolean>(false);
  public preparationTime = input<string | undefined>(undefined);
  public image = input<string>('200px');

  public setFavorite = output<void>();
  public clickItem = output<void>();

  public imageLoaded = signal(false);
  public imageOnError = signal(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['image'] && changes['image'].currentValue !== changes['image'].previousValue) {
      this.resetValues();
      this.handleLoadingImage();
    }
  }

  public handleFavorite($event: Event): void {
    $event.stopImmediatePropagation();
    this.setFavorite.emit();
  }

  private handleLoadingImage(): void {
    const img = new Image();
    img.src = this.image();
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
