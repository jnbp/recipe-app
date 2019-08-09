import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../../../services/ingredient.service';
import {NgForm} from '@angular/forms';


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
  units = ['g', 'ml', 'piece'];
  categorys = ['obst', 'gemuese', 'milchprodukt' , 'basics', 'sonstiges'];

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (this.ingredient.title != '') {
      this.ingredientService.addIngredient(this.ingredient);

    }
    console.log(this.ingredient);

    form.resetForm();
  }

}
