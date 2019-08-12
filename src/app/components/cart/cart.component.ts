import {
  Component,
  OnInit
} from '@angular/core';
import {
  CartService
} from '../../services/cart.service';
import {
  IngredientService
} from '../../services/ingredient.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  ingredients: {
    ingredient: Ingredient,
    quantity: number
  } [] = [];
  categorys: string[] = [];

  constructor(public ingredientService: IngredientService,
              public cartService: CartService,
              //private bottomSheetRef: MatBottomSheetRef<ToolbarComponent>
  ) {}

  async ngOnInit() {


    // pre load category array
    this.categorys = this.ingredientService.getCategorys();

    // subscribe to cartItems
    await this.cartService.getCart().subscribe(async cartItems => {
      this.cartItems = cartItems;

      // grab the ingredient object and quantity for each cartItem-ingredientID-reference
      for (let i = 0; i < this.cartItems.length; i++) {
        this.ingredients.push({
          ingredient: (await this.ingredientService.getIngredient(this.cartItems[i].ingredientID)),
          quantity: cartItems[i].quantity
        });

      }




    });




  }

}
