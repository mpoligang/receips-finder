import { MapStructService } from './../../shared/services/map-struct/map-struct.service';
import { FavoriteService } from './../../shared/services/favorite/favorite.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../shared/api/api.service';
import { TitleWithBackNavigationComponent } from '../../shared/components/title-with-back-navigation/title-with-back-navigation.component';
import { take } from 'rxjs';
import { AppRouting } from '../../shared/consts/AppRouting';
import { Meal, MealInstance } from '../../shared/models/Meal.interface';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MealItemComponent } from '../../shared/components/meal-item/meal-item.component';
import { Tabs } from './enums/Tabs.enum';
import { IngredientItemComponent } from './components/ingredient-item/ingredient-item.component';
import { PreparationItemComponent } from './components/preparation-item/preparation-item.component';

@Component({
  selector: 'app-meal-detail',
  imports: [TitleWithBackNavigationComponent, ButtonModule, ConfirmDialogModule, MealItemComponent, IngredientItemComponent, PreparationItemComponent],
  providers: [ConfirmationService],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.scss'
})
export class MealDetailComponent implements OnInit {

  public data = signal<Meal>(new MealInstance());
  public selectedTab = signal<Tabs>(Tabs.INGREDIENTS);
  public tabs = Tabs;

  private id: string;
  private readonly apiService = inject(ApiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favoriteService = inject(FavoriteService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly MapStructService = inject(MapStructService);


  constructor() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.initializeData();
  }



  public backToList(): void {
    this.router.navigate([`/${AppRouting.LIST}`]);
  }

  public confirmHandleFavorite(): void {
    const header = !this.data()?.favorite ? 'Set as favorites' : 'Remove from favorites';
    const message = `Are you sure that you want to ${this.data().favorite ? 'remove from favorites' : 'save as favorites'} ${this.data().title}`;
    this.confirmationService.confirm({
      message,
      header,
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => this.handleFavorite(),
      reject: () => this.confirmationService.close()
    });
  }

  private handleFavorite(): void {
    this.data().favorite = !this.data()?.favorite;
    this.data()?.favorite ? this.favoriteService.setAsFavorite(this.data()) : this.favoriteService.removeFromFavorites(this.data());
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: this.data().title + (this.data().favorite ? ` saved as favorite` : ` removed from favorites`)
    });
  }

  private initializeData(): void {
    this.apiService.getMealById(this.id).pipe(take(1)).subscribe(response => {
      console.log(response);
      if (response.data.length === 0) {
        this.router.navigate([`/${AppRouting.NOT_FOUND}`], {
          queryParams: {
            message: `Result not found for invalid meal-ID ${this.id}`,
            navigationPath: AppRouting.LIST,
            navigationLabel: 'Back to List'
          }
        })
        return;
      }
      this.data.set(response.data[0]);
      console.log(this.data());

    });
  }

}
