import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredientsCollection: AngularFirestoreCollection<Ingredient>;
  ingredients: Observable<Ingredient[]>;
  itemDoc: AngularFirestoreDocument<Ingredient>;
  selectedIngredients = [];

  constructor(public afs: AngularFirestore) {
    //this.ingredients = this.afs.collection('ingredients').valueChanges();

    this.ingredientsCollection = this.afs.collection('ingredients', ref => ref.orderBy('category', 'asc'));

    // Fetch Document WITH ID
    this.ingredients = this.ingredientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Ingredient;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getIngredients() {
    return this.ingredients;
  }


  addIngredient(ingredient: Ingredient) {
    this.ingredientsCollection.add(ingredient);
  }

  deleteIngredient(ingredient: Ingredient) {
    this.itemDoc = this.afs.doc(`ingredients/${ingredient.id}`);
    this.itemDoc.delete();
  }

  setSelectedIngredients(ingredients) {
    this.selectedIngredients = ingredients;
  }

  getSelectedIngredients() {
    return this.selectedIngredients;
  }



}
