import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {CartService} from '../../../services/cart.service';
import {IngredientService} from '../../../services/ingredient.service';
import {element} from 'protractor';
import {__await} from 'tslib';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-overview-recipes',
  templateUrl: './overview-recipes.component.html',
  styleUrls: ['./overview-recipes.component.css']
})
export class OverviewRecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private cartService: CartService,
              private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;

    });
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }

  async addToCart(recipe: Recipe) {
    for (const element of await this.recipeService.getIngredients2(recipe.id)) {
      this.cartService.addToCart(element.ingredientID, element.quantity);
    }
    this.snackbar.open((await this.recipeService.getIngredients2(recipe.id)).length + ' Zutaten für das Rezept "' + recipe.title +
      '" in Einkaufsliste hinzugefügt', '', {duration: 3000});

  }

}
