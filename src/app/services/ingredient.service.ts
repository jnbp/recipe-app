import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredientsCollection: AngularFirestoreCollection<Ingredient>;
  ingredients: Observable<Ingredient[]>

  constructor(public afs: AngularFirestore) {
    //this.ingredients = this.afs.collection('ingredients').valueChanges();

    // Fetch Document WITH ID
    this.ingredients = this.afs.collection('ingredients').snapshotChanges().pipe(
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
}
