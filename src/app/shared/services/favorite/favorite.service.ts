import { Injectable } from '@angular/core';
import { Meal } from '../../models/Meal.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {


  public getFavorites(): Array<Meal> {
    let result = [];
    const data = localStorage.getItem('favorites');
    if (!data) {
      return [];
    }
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        result = parsed;
      } else {
        console.warn('JSON is not an array', parsed);
        result = [];
      }
    } catch (error) {
      console.error('Error JSON parsing:', error);
      result = [];
    }
    return result;
  }

  public setAsFavorite(data: Meal): void {
    const favorites = this.getFavorites();
    favorites.push(data);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  public removeFromFavorites(data: Meal): void {
    const favorites = this.getFavorites();
    const favoriteWithoutItemToRemove = favorites.filter(item => item.id !== data.id)
    localStorage.setItem('favorites', JSON.stringify(favoriteWithoutItemToRemove));
  }

  public checkIfIsFavorite(mealId: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(item => item.id === mealId);
    return index !== -1 && favorites[index].favorite;
  }

}
