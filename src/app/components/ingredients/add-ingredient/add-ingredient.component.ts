import {
  Component,
  OnInit
} from '@angular/core';
import {
  IngredientService
} from '../../../services/ingredient.service';
import {
  NgForm
} from '@angular/forms';
import {
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import {
  IngredientsComponent
} from '../ingredients.component';


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
  units: string[] = [];
  categorys: string[] = [];

  constructor(private ingredientService: IngredientService,
              private matDialogRef: MatDialogRef < AddIngredientComponent, IngredientsComponent > ,
              private snackbar: MatSnackBar) {}

  // get units and category arrays
  ngOnInit() {
    this.units = this.ingredientService.getUnits();
    this.categorys = this.ingredientService.getCategorys();
  }

  // check if form is filled and add with ingredient service
  onSubmit(form: NgForm) {
    if (this.ingredient.title !== '' && this.ingredient.unit !== '' && this.ingredient.category !== '') {
      this.ingredientService.addIngredient(this.ingredient);
      this.snackbar.open(this.ingredient.title + ' hinzugefügt', '', {
        duration: 3000
      });
    }


    form.resetForm();
    this.matDialogRef.close();


  }

}
