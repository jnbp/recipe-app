import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IngredientService} from '../../services/ingredient.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  ingredients: Ingredient[];

  constructor(public ingredientService: IngredientService,
              public cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cartItems => {
      console.log(cartItems);
      this.cartItems = cartItems;


    });



 }

}
