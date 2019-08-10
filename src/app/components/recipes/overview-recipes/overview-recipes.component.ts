import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-overview-recipes',
  templateUrl: './overview-recipes.component.html',
  styleUrls: ['./overview-recipes.component.css']
})
export class OverviewRecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
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

  addToChart(recipe: Recipe) {



    this.cartService.addToCart(this.recipeService.getIngredients(recipe));
  }

}
