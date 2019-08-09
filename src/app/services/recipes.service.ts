import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipesingredientsCollection: AngularFirestoreCollection<RecipeIngredient>;
  recipes: Observable<Recipe[]>
  itemDoc: AngularFirestoreDocument<Recipe>;

  constructor(public afs: AngularFirestore) {
    //this.recipes = this.afs.collection('recipes').valueChanges();

    this.recipesCollection = this.afs.collection('recipes', ref => ref.orderBy('category','asc'));
    this.recipesingredientsCollection = this.afs.collection('recipes_ingredients', ref => ref.orderBy('recipeID','asc'));

    // Fetch Document WITH ID
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Recipe;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getRecipes() {
    return this.recipes;
  }


  addRecipe(recipe: Recipe, rID, selectedIngredients) {

    this.recipesCollection.add(recipe).then(docRef => {
      for (let ingredient of selectedIngredients) {
        this.recipesingredientsCollection.add({recipeID: docRef.id, ingredientID: ingredient});
        console.log({recipeID: docRef.id, ingredientID: ingredient});
      }
    });


  }



  deleteRecipe(recipe: Recipe) {
    this.itemDoc = this.afs.doc(`recipes/${recipe.id}`);
    this.itemDoc.delete();
  }

}
