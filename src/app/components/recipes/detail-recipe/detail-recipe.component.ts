import { Component, OnInit, OnDestroy} from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {IngredientService} from '../../../services/ingredient.service';
import {CartService} from '../../../services/cart.service';

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

  localIngredient: [] = [];

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {



    this.recipeService.getRecipe('wFpdJLOdgm9sTwa57NGR').then( recipe => {
      this.recipe = recipe;
    });




    this.sub = this.route.params.subscribe(async params => {
      this.id = params.id; // (+) converts string 'id' to a number


      this.recipe = await this.recipeService.getRecipe(this.id);
      console.log(this.recipe.title);
      // In a real app: dispatch action to load the details here.


      for (const element of await this.recipeService.getIngredients2(this.id)) {
        this.ingredients.push(await this.ingredientService.getIngredient(element.ingredientID));
        this.recipeIngredients.push(element);
        console.log(element);


      }




    });




    /*await this.recipeService.getRecipe(this.id).subscribe(recipe => {
      console.log('HU', recipe);
      this.recipe = recipe;
      console.log(this.recipe);
    });*/







  }


  async addToCart(recipe: Recipe) {
    for (const element of await this.recipeService.getIngredients2(this.id)) {
      this.cartService.addToCart(element);
    }
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
