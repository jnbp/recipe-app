import {Component, OnInit, ViewChild} from '@angular/core';
import {IngredientService} from '../../services/ingredient.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddIngredientComponent} from './add-ingredient/add-ingredient.component';
import {SelectIngredientsComponent} from './select-ingredient/select-ingredients.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'unit', 'category'];
  dataSource: MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();
  ingredients: Ingredient[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private ingredientService: IngredientService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {

    this.ingredientService.getIngredients3().subscribe(ingredients =>
    this.dataSource.data = ingredients
    );

    this.ingredientService.getIngredients().subscribe(ingredients => {
      console.log(ingredients);
      this.ingredients = ingredients;
    });
    console.log(this.dataSource.data);


  }

  deleteIngredient(event, ingredient) {
    this.ingredientService.deleteIngredient(ingredient);
    console.log(ingredient);
  }

  openIngredientDialog(): void {
    this.matDialog.open(AddIngredientComponent);

  }

  openIngredientToCartDialog(): void {
    this.matDialog.open(SelectIngredientsComponent);

  }


}
