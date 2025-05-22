import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MapStructService } from './../services/map-struct/map-struct.service';
import { environment } from '../../../environments/environment';
import { MealList } from '../models/MealList.interface';
import { MealResponse } from './dtos/MealDto.interface';
import { ApiEndpoints } from '../consts/ApiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient);
  private mapStructService = inject(MapStructService);

  public searchMeals(term?: string): Observable<MealList> {
    let params = new HttpParams().append('s', term ?? '');
    return this.http.get<MealResponse>(`${environment.api}/${ApiEndpoints.SEARCH}`, { params })
      .pipe(map((data: MealResponse) => this.mapStructService.mapMealsResponseResults(data.meals)));
  }

  public getMealById(id: string): Observable<MealList> {
    let params = new HttpParams().append('i', id);
    return this.http.get<MealResponse>(`${environment.api}/${ApiEndpoints.LOOKUP}`, { params })
      .pipe(map((data: MealResponse) => this.mapStructService.mapMealsResponseResults(data.meals)));
  }




}
