import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnDestroy {

  public message = signal<string>('Attention page not found');
  public navigationPath = signal<string>('');
  public navigationLabel = signal<string>('Go Back');

  private readonly location = inject(Location);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.message.set(this.activatedRoute.snapshot.queryParams['message'] ?? this.message());
    this.navigationPath.set(this.activatedRoute.snapshot.queryParams['navigationPath'] ?? this.navigationPath());
    this.navigationLabel.set(this.activatedRoute.snapshot.queryParams['navigationLabel'] ?? this.navigationLabel());
  }

  ngOnDestroy(): void {
    this.message.set('');
    this.navigationPath.set('');
  }

  public backNavigation(): void {
    if (this.navigationPath()) {
      this.router.navigate([`/${this.navigationPath()}`]);
      return;
    }
    this.location.back();
  }

}
