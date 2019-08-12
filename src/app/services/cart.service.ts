import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCollection: AngularFirestoreCollection<CartItem>;
  cartItems: Observable<CartItem[]>;
  cartItemDoc: AngularFirestoreDocument<CartItem>;
  angular: any;

  constructor(public afs: AngularFirestore) {

    this.cartCollection = this.afs.collection('cart', );

    // Fetch Document WITH ID
    this.cartItems = this.cartCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as CartItem;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getCart() {
    return this.cartCollection.valueChanges();
  }











  addToCart(recipeIngredient: RecipeIngredient) {


    console.log('add: ', recipeIngredient);


    this.cartCollection.add({ingredientID: recipeIngredient.ingredientID, quantity: 999});



    // this.angular.forEach(ingredients, ingredientID => {
    // console.log(ingredientID);
    // })


    // this.cartCollection.add({ingredientID: ingredient});

  }


}
