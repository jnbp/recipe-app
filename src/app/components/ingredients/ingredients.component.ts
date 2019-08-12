import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../services/ingredient.service';
import {MatDialog} from '@angular/material';
import {AddIngredientComponent} from './add-ingredient/add-ingredient.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private ingredientService: IngredientService,
              private matDialog: MatDialog) {
  }

  async ngOnInit() {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });


  }

  deleteIngredient(event, ingredient) {
    this.ingredientService.deleteIngredient(ingredient);
    console.log(ingredient);
  }

  openIngredientDialog(): void {
    this.matDialog.open(AddIngredientComponent);

  }

}
