import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IngredientService} from '../../services/ingredient.service';
import {MatBottomSheetRef} from '@angular/material';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {element} from 'protractor';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  ingredients: {ingredient: Ingredient, quantity: number}[] = [];
  ingredients2: Ingredient;
  categorys: string[] = [];

  constructor(public ingredientService: IngredientService,
              public cartService: CartService,
              //private bottomSheetRef: MatBottomSheetRef<ToolbarComponent>
               ) { }

  async ngOnInit() {



    this.categorys = this.ingredientService.getCategorys();


    await this.cartService.getCart().subscribe(async cartItems => {
      this.cartItems = cartItems;


      for (let i = 0; i < this.cartItems.length; i++) {
        const tempIngredient = await this.ingredientService.getIngredient2(this.cartItems[i].ingredientID);
        this.ingredients.push({ingredient: tempIngredient, quantity: cartItems[i].quantity});

      }











    });
    


/*


    await this.cartService.getCart().subscribe(async cartItems => {
      this.cartItems = cartItems;
      console.log(this.cartItems);
      for (const element of this.cartItems) {
        this.ingredients.push(await this.ingredientService.getIngredient(element.ingredientID));
      }
      console.log(this.ingredients);
    });
    console.log(this.ingredients);
    
    
*/
    
    

/*
    this.ingredientService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      console.log(this.recipes);
    });





    for (const element of await this.cartService.getCart()) {
      this.ingredients.push(await this.ingredientService.getIngredient(element.ingredientID));
    }



    await  this.cartService.getCart()

    var temp = await this.cartService.getCart();
    await temp.subscribe(async cartItems => {
      console.log(cartItems);
      this.cartItems = cartItems;

      for (let item of cartItems) {
        this.ingredients.push(await this.ingredientService.getIngredient(item.ingredientID));

      }

      //console.log(await this.ingredientService.getIngredient('VQmo55d2dF56x3QEiYO0'));


    });

    console.log(this.ingredients.length);

*/
 }

}
