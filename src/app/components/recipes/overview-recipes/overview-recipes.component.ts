import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {CartService} from '../../../services/cart.service';
import {IngredientService} from '../../../services/ingredient.service';
import {element} from 'protractor';
import {__await} from 'tslib';

@Component({
  selector: 'app-overview-recipes',
  templateUrl: './overview-recipes.component.html',
  styleUrls: ['./overview-recipes.component.css']
})
export class OverviewRecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private cartService: CartService
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      console.log(this.recipes);
    });
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }

  async addToCart(recipe: Recipe) {
    for (const element of await this.recipeService.getIngredients(recipe)) {
      this.cartService.addToCart(element);
    }
  }

}
