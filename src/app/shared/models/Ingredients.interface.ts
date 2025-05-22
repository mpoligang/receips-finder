import { Thumbs, ThumbsInstance } from "./Thumbs.interface";

export interface Ingredient {
  ingredient: string;
  measure: string;
  thumbs: Thumbs;
}

export class IngredientInstance {
  public ingredient: string;
  public measure: string;
  public thumbs: Thumbs;

  constructor() {
    this.ingredient = '';
    this.measure = '';
    this.thumbs = new ThumbsInstance();
  }

}