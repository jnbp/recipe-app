import { Component, OnInit, OnDestroy} from '@angular/core';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.css']
})
export class DetailRecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  private sub: any;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {



    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number



      // In a real app: dispatch action to load the details here.
    });




    this.recipeService.getRecipe(this.id).subscribe(recipe => {
      this.recipe = recipe;
      console.log(this.recipe);
    });


  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
