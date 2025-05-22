import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppRouting } from '../../shared/consts/AppRouting';

@Component({
  selector: 'app-landing',
  imports: [ButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  private router = inject(Router);


  public goToSearchReceips(): void {
    this.router.navigate([`/${AppRouting.LIST}`]);
  }

}
