import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(public ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
  }

  deleteIngredient(event, ingredient) {
    this.ingredientService.deleteIngredient(ingredient);
    console.log(ingredient);
  }

}
