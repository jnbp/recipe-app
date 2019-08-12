import {
  Component,
  OnInit
} from '@angular/core';
import {
  RecipeService
} from '../../../services/recipe.service';
import {
  CartService
} from '../../../services/cart.service';
import {
  IngredientService
} from '../../../services/ingredient.service';
import {
  MatSnackBar
} from '@angular/material';

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
  ) {}

  ngOnInit() {

    // get recipes
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;

    });
  }


  async addToCart(recipe: Recipe) {
    // fetch all ingredients of recipe
    for (const element of await this.recipeService.getIngredients(recipe.id)) {
      this.cartService.addToCart(element.ingredientID, element.quantity);
    }

    this.snackbar.open((await this.recipeService.getIngredients(recipe.id)).length + ' Zutaten für das Rezept "' + recipe.title +
      '" in Einkaufsliste hinzugefügt', '', {
      duration: 3000
    });

  }

}
