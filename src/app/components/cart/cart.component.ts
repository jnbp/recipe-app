import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IngredientService} from '../../services/ingredient.service';
import {MatBottomSheetRef} from '@angular/material';
import {ToolbarComponent} from '../toolbar/toolbar.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  ingredients: Ingredient[] = [];
  ingredients2: Ingredient;

  constructor(public ingredientService: IngredientService,
              public cartService: CartService,
              private bottomSheetRef: MatBottomSheetRef<ToolbarComponent>) { }

  async ngOnInit() {

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


 }

}
