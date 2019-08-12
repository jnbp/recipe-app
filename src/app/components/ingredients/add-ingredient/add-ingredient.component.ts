import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../../services/ingredient.service';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {IngredientsComponent} from '../ingredients.component';


@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  ingredient: Ingredient = {
    title: '',
    unit: '',
    category: ''
  }
  units = ['g', 'ml', 'Stück', 'TL', 'EL'];
  categorys = ['Obst', 'Gemüse', 'Milchprodukte' , 'Basics', 'Sonstiges'];

  constructor(private ingredientService: IngredientService,
              private matDialogRef: MatDialogRef<AddIngredientComponent, IngredientsComponent>) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (this.ingredient.title != '') {
      this.ingredientService.addIngredient(this.ingredient);

    }
    console.log(this.ingredient);

    form.resetForm();
    this.matDialogRef.close();
  }

}
