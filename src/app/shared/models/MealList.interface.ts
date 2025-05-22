import { Meal } from "./Meal.interface";

export interface MealList {
    result: number | null;
    data: Array<Meal>;
}


export class MealListInstace implements MealList {
    public result: number | null;
    public data: Array<Meal>;

    constructor() {
        this.result = null;
        this.data = [];
    }
}

