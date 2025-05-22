import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-title-with-back-navigation',
  imports: [ButtonModule],
  templateUrl: './title-with-back-navigation.component.html',
  styleUrl: './title-with-back-navigation.component.scss'
})
export class TitleWithBackNavigationComponent {

  public title = input<string>();
  public backNavigation = output<void>();


}
