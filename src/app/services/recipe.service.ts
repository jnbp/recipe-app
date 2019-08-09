import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipesingredientsCollection: AngularFirestoreCollection<RecipeIngredient>;
  recipes: Observable<Recipe[]>;
  recipesingredients: Observable<RecipeIngredient[]>;
  recipeDoc: AngularFirestoreDocument<Recipe>;
  recipeIngredeintDoc: AngularFirestoreDocument<RecipeIngredient>;
  private recipeID: string;
  private qurey: any;

  constructor(public afs: AngularFirestore) {
    // this.recipes = this.afs.collection('recipes').valueChanges();

    this.recipesCollection = this.afs.collection('recipes', ref => ref.orderBy('title','asc'));
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

    // Fetch Document WITH ID same for recipe_ingredients
    this.recipesingredients = this.recipesingredientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as RecipeIngredient;
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
    console.log(recipe);
    //this.recipeDoc = this.afs.doc(`recipes/${recipe.id}`);
    //this.recipeDoc.delete();

    //this.recipeDoc = this.recipesingredientsCollection.


    //this.recipeIngredeintDoc = this.afs.collection('recipes_ingredients', ref => ref.where('recipeID', '==', recipe.id));

    //console.log(this.afs.collection('recipes_ingredients', ref => {
     // let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
     // if (this.recipeID) { query = this.qurey.where('recipeID', '==', recipe.id)};
     // return query;
    //}).valueChanges());

    console.log(this.recipesingredientsCollection.ref.where('recipeID', '==', recipe.id));

    console.log(this.recipeIngredeintDoc);
    //this.recipeIngredeintDoc.delete();
  }


  addRecipeToChart(recipe: Recipe) {

  }

}
