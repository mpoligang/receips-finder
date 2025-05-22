import { Preparation } from './Preparation.interface';
import { Ingredient } from './Ingredients.interface';
import { Thumbs } from './Thumbs.interface';

export interface Meal {
  id: string;
  category: string;
  title: string;
  source: string | null;
  nationality: string;
  tags?: string[];
  preparation: Preparation[];
  estimatedTime?: string;
  thumbs: Thumbs;
  ingredients: Ingredient[];
  favorite: boolean;
}

export class MealInstance {
  public id: string;
  public category: string;
  public title: string;
  public source: string | null;
  public nationality: string;
  public tags?: string[];
  public preparation: Preparation[];
  public estimatedTime?: string;
  public thumbs: Thumbs;
  public ingredients: Ingredient[];
  public favorite: boolean;

  constructor() {
    this.id = '';
    this.category = '';
    this.title = '';
    this.source = '';
    this.nationality = '';
    this.tags = [];
    this.preparation = [];
    this.estimatedTime = '';
    this.thumbs = {
      small: '',
      medium: '',
      large: ''
    };
    this.ingredients = [];
    this.favorite = false;
  }
}

