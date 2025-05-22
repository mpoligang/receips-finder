import { Routes } from '@angular/router';
import { AppRouting } from './shared/consts/AppRouting';
import { LandingComponent } from './pages/landing/landing.component';
import { MealsListComponent } from './pages/meals-list/meals-list.component';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    {
        path: AppRouting.LANDING,
        loadComponent: () => LandingComponent
    },
    {
        path: AppRouting.LIST,
        loadComponent: () => MealsListComponent
    },
    {
        path: `${AppRouting.DETAIL}/:id`,
        loadComponent: () => MealDetailComponent,
    },
    {
        path: `${AppRouting.NOT_FOUND}`,
        loadComponent: () => NotFoundComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: AppRouting.NOT_FOUND,
    }
];
