import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  RecipeService
} from '../../../services/recipe.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  IngredientService
} from '../../../services/ingredient.service';
import {
  CartService
} from '../../../services/cart.service';
import {
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css']
})
export class DetailRecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: string;
  private sub: any;
  ingredients: Ingredient[] = [];
  recipeIngredients: RecipeIngredient[] = [];

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar) {}

  ngOnInit() {
    // get url path
    this.sub = this.route.params.subscribe(async params => {
      this.id = params.id;

      // get recipe object of current id
      this.recipe = await this.recipeService.getRecipe(this.id);

      // fetch all ingredients of recipe
      for (const element of await this.recipeService.getIngredients(this.id)) {
        this.ingredients.push(await this.ingredientService.getIngredient(element.ingredientID));
        this.recipeIngredients.push(element);
      }
    });
  }

  async addToCart(recipe: Recipe) {
    // fetch all ingredients of recipe
    for (const element of await this.recipeService.getIngredients(this.id)) {
      this.cartService.addToCart(element.ingredientID, element.quantity);
    }

    this.snackbar.open((await this.recipeService.getIngredients(this.id)).length + ' Zutaten für das Rezept "' + recipe.title +
      '" in Einkaufsliste hinzugefügt', '', {
      duration: 3000
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
