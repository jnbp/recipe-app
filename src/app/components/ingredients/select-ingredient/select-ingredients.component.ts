import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../../services/ingredient.service';
import {AddIngredientComponent} from '../add-ingredient/add-ingredient.component';
import {MatDialog} from '@angular/material';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-select-ingredients',
  templateUrl: './select-ingredients.component.html',
  styleUrls: ['./select-ingredients.component.css']
})
export class SelectIngredientsComponent implements OnInit {
  ingredients: Ingredient[];
  selectedOptions: string[] = ['Area 3'];
  quantity: number;
  selectedIngredient: Ingredient;

  selectedIngredients: {ingredients: string[], quantities: number[]} = {ingredients: [], quantities: []};

  tempList: {ingredientID: string, quantity: number, title: string}[] = [];

  constructor(public ingredientService: IngredientService,
              private matDialog: MatDialog ) { }

  ngOnInit() {
    this.selectedOptions = [];

    this.ingredientService.getIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
  }

  onNgModelChange(event) {
    //this.ingredientService.setSelectedIngredients(this.selectedOptions);
    //console.log(this.selectedOptions);

    //console.log("CHAN");
  }

  openIngredientDialog(): void {
    this.matDialog.open(AddIngredientComponent);
  }

  async onSubmit(form: NgForm) {
    if (this.quantity > 0) {
      //this.ingredientService.addIngredient(this.ingredient);


      // For selected ingredients view
      this.tempList.push({ingredientID: this.selectedIngredient[0].id, quantity: this.quantity, title: this.selectedIngredient[0].title});
      //console.log(this.tempList);


      this.selectedIngredients.ingredients.push(this.selectedIngredient[0].id);
      this.selectedIngredients.quantities.push(this.quantity);

      //this.selectedIngredients[0].push(this.selectedIngredient[0], this.quantity);
      //console.log('selectedIngredient', this.selectedIngredient[0]);


      this.ingredientService.setSelectedIngredients(this.selectedIngredients.ingredients, this.selectedIngredients.quantities);



      console.log('OUT', this.ingredientService.getSelectedIngredients(), this.ingredientService.getSelectedIngredientsQuantities());
      form.resetForm();
    }


    // this.matDialogRef.close();
  }

}
