import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';

@Component({
  selector: 'app-overview-recipes',
  templateUrl: './overview-recipes.component.html',
  styleUrls: ['./overview-recipes.component.css']
})
export class OverviewRecipesComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

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
    this.recipeService.addRecipeToChart(recipe);
  }

}
