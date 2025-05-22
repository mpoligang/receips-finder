import { Component, inject, input, OnDestroy, output, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  debounceTime,
  Subject,
  takeUntil,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TitleWithBackNavigationComponent } from '../../../../shared/components/title-with-back-navigation/title-with-back-navigation.component';
import { Router } from '@angular/router';
import { AppRouting } from '../../../../shared/consts/AppRouting';

@Component({
  selector: 'app-meals-search-bar',
  imports: [ButtonModule, InputIconModule, IconFieldModule, InputTextModule, FormsModule, TitleWithBackNavigationComponent],
  templateUrl: './meals-search-bar.component.html',
  styleUrl: './meals-search-bar.component.scss',
})
export class MealsSearchBarComponent implements OnDestroy {

  public isLoading = input<boolean>(false);
  public results = input<number | null>(234);
  public searchAction = output<string>();
  public term = signal<string>('');

  private search$: Subject<void>;
  private destroy$: Subject<void>;

  private router = inject(Router);

  constructor() {
    this.search$ = new Subject<void>();
    this.destroy$ = new Subject<void>();
    this.searchSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleSearch(): void {
    this.search$.next();
  }

  public handleClear(): void {
    this.term.set('');
    this.searchAction.emit(this.term());
  }

  public handleBackToLanding(): void {
    this.router.navigate([`/${AppRouting.LANDING}`]);
  }

  private searchSubscription(): void {
    this.search$.pipe(
      takeUntil(this.destroy$),
      debounceTime(700),
    ).subscribe(() => this.searchAction.emit(this.term()));
  }

}
