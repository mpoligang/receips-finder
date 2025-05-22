import { Router } from '@angular/router';

import { Component, signal, inject, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { take, finalize } from "rxjs";
import { ApiService } from "../../shared/api/api.service";
import { ResultNotFoundComponent } from "../../shared/components/result-not-found/result-not-found.component";
import { Meal } from "../../shared/models/Meal.interface";
import { FavoriteService } from "../../shared/services/favorite/favorite.service";
import { MealItemComponent } from "../../shared/components/meal-item/meal-item.component";
import { MealsSearchBarComponent } from "./components/meals-search-bar/meals-search-bar.component";
import { AppRouting } from '../../shared/consts/AppRouting';
import { MealList, MealListInstace } from '../../shared/models/MealList.interface';


@Component({
  selector: 'app-meals-list',
  imports: [MealsSearchBarComponent, MealItemComponent, SkeletonModule, ResultNotFoundComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './meals-list.component.html',
  styleUrl: './meals-list.component.scss',
})
export class MealsListComponent implements OnInit {

  public isLoading = signal<boolean>(false);
  public mealList = signal<MealList>(new MealListInstace());
  public skeletonData = signal(new Array(20));

  private readonly apiService = inject(ApiService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.handleSearch();
  }

  public handleSearch(search?: string): void {
    this.resetValues();
    this.isLoading.set(true);
    this.apiService
      .searchMeals(search)
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((response) => {
        this.mealList.set(response);
      });
  }

  public goToDetail(id: string): void {
    this.router.navigate([`${AppRouting.DETAIL}/${id}`]);
  }

  public confirmHandleFavorite(data: Meal): void {
    const header = !data.favorite ? 'Set as favorites' : 'Remove from favorites';
    const message = `Are you sure that you want to ${data.favorite ? 'remove from favorites' : 'save as favorites'} ${data.title}`;
    this.confirmationService.confirm({
      message,
      header,
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => this.handleFavorite(data),
      reject: () => this.confirmationService.close()
    });
  }

  private handleFavorite(data: Meal): void {
    data.favorite = !data.favorite;
    data.favorite ? this.favoriteService.setAsFavorite(data) : this.favoriteService.removeFromFavorites(data);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: data.title + (data.favorite ? ` saved as favorite` : ` removed from favorites`)
    });
  }

  private resetValues(): void {
    this.mealList.set(new MealListInstace());
  }
}
