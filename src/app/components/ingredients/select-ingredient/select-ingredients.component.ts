import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../../services/ingredient.service';

@Component({
  selector: 'app-select-ingredients',
  templateUrl: './select-ingredients.component.html',
  styleUrls: ['./select-ingredients.component.css']
})
export class SelectIngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  selectedOptions: string[] = ['Area 3'];

  constructor(public ingredientService: IngredientService) { }

  ngOnInit() {
    this.selectedOptions = [];

    this.ingredientService.getIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
  }

  onNgModelChange(event) {
    this.ingredientService.setSelectedIngredients(this.selectedOptions);
    console.log(this.selectedOptions);
  }

}
