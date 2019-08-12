import {
  Component,
  OnInit
} from '@angular/core';
import {
  IngredientService
} from '../../../services/ingredient.service';
import {
  AddIngredientComponent
} from '../add-ingredient/add-ingredient.component';
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import {
  NgForm
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  CartService
} from '../../../services/cart.service';
import {
  IngredientsComponent
} from '../ingredients.component';

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

  selectedIngredients: {
    ingredients: string[],
    quantities: number[]
  } = {
    ingredients: [],
    quantities: []
  };

  tempList: {
    ingredientID: string,
    quantity: number,
    title: string
  } [] = [];

  constructor(private ingredientService: IngredientService,
              private cartService: CartService,
              private matDialog: MatDialog,
              private router: Router,
              private snackbar: MatSnackBar) {}

  // init local selectedOptions array
  // fetch ingredients
  ngOnInit() {
    this.selectedOptions = [];

    this.ingredientService.getIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
  }

  // new ingredient dialog opener
  openIngredientDialog(): void {
    this.matDialog.open(AddIngredientComponent);
  }

  // check if component is loaded in "add recipe" component or "ingredients"(cartAdd without recipe)
  // -> same component used for ingredientsSelection
  async onSubmit(form: NgForm) {
    if (this.router.url.includes('add')) {
      if (this.quantity > 0) {

        // for selected ingredients view
        this.tempList.push({
          ingredientID: this.selectedIngredient[0].id,
          quantity: this.quantity,
          title: this.selectedIngredient[0].title
        });

        // adding currently selected item to item-arrays
        this.selectedIngredients.ingredients.push(this.selectedIngredient[0].id);
        this.selectedIngredients.quantities.push(this.quantity);

        // since ingredient selection is stored in ingredientService, transmit item-arrays to ingredientService
        this.ingredientService.setSelectedIngredients(this.selectedIngredients.ingredients, this.selectedIngredients.quantities);

        form.resetForm();
      }

    } else {
      // add selected ingredients to cart
      this.cartService.addToCart(this.selectedIngredient[0].id, this.quantity);
      this.snackbar.open(this.selectedIngredient[0].title + ' der Einkaufsliste hinzugefügt', '', {
        duration: 3000
      });
      this.matDialog.closeAll();
    }

  }

}
