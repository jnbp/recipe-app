import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe.service';
import {MatVerticalStepper} from '@angular/material';
import {IngredientService} from '../../../services/ingredient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe = {
    title: '',
    picture: '',
    instruction: ''
  };
  ingredient = [];
  ChildCurrentVal: string[];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private _formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.forthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSubmit(stepper: MatVerticalStepper) {

    if (this.recipe.title !== '' && this.recipe.instruction !== '' && this.recipe.picture !== '') {
      this.recipeService.addRecipe(this.recipe, this.recipe.id, this.ingredientService.getSelectedIngredients());

      console.log(this.recipe);
      console.log(this.ingredientService.getSelectedIngredients());

      stepper.reset();

      this.router.navigate(['/recipes']);

    }
  }

}
