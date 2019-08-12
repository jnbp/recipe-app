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
  selectedIngredientsQuantities: number[] = [];

  constructor(public afs: AngularFirestore) {
    //this.ingredients = this.afs.collection('ingredients').valueChanges();

    this.ingredientsCollection = this.afs.collection('ingredients', ref => ref.orderBy('category', 'asc'));

    this.fetchDocumentID();
  }

  fetchDocumentID() {
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
    this.fetchDocumentID();

    console.log(this.ingredients);
    console.log(this.ingredientsCollection.valueChanges());
    return this.ingredients;
  }


  async getIngredients2(): Promise<Ingredient> {
    const docRef = this.ingredientsCollection.doc();
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return  doc.data() as Ingredient;
    }
    return null;
  }

  async getIngredient(id: string): Promise<Ingredient> {
    const docRef = this.ingredientsCollection.doc(id);
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return  doc.data() as Ingredient;
    }
    return null;
  }


  addIngredient(ingredient: Ingredient) {
    this.ingredientsCollection.add(ingredient);
  }

  deleteIngredient(ingredient: Ingredient) {
    this.itemDoc = this.afs.doc(`ingredients/${ingredient.id}`);
    this.itemDoc.delete();
  }

  setSelectedIngredients(ingredients, quantities: number[]) {
    this.selectedIngredients = ingredients;
    this.selectedIngredientsQuantities = quantities;
  }

  getSelectedIngredients() {
    return this.selectedIngredients;
  }

  getSelectedIngredientsQuantities() {
    return this.selectedIngredientsQuantities;
  }



}
