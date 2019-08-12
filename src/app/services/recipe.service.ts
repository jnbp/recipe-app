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


    this.fetchDocumentID();

  }

  fetchDocumentID() {
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
    this.fetchDocumentID();

    console.log(this.recipes);
    console.log(this.recipesCollection.valueChanges());
    return this.recipes;
  }


  getRecipeOLDOLD(id) {
    return this.afs.doc<Recipe>('recipes/' + id).valueChanges();
  }

  async getRecipeOLD(id: string): Promise<Recipe> {
    const docRef = this.recipesCollection.doc(id);
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return  doc.data() as Recipe;
    }
    return null;
  }

  async getRecipe(recipeID: string): Promise<Recipe> {

    const docRef = this.recipesCollection.doc<Recipe>(recipeID);

    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return doc.data() as Recipe;
    }
    return null;



  }




  addRecipe(recipe: Recipe, rID, selectedIngredients) {

    this.recipesCollection.add(recipe).then(docRef => {
      for (const ingredient of selectedIngredients) {
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

  async getIngredients(recipe: Recipe): Promise<RecipeIngredient[]> {

    const ingredientArray = [];
    const query = this.recipesingredientsCollection.ref.where('recipeID', '==', recipe.id);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.log('no data found');
      return ingredientArray;
    } else {
      console.log('no unique data');
      querySnapshot.forEach(documentSnapshot => {
        ingredientArray.push(documentSnapshot.data());
        // ref.id    oder .data
      });
    }

    return ingredientArray;

  }

  async getIngredients2(recipeID: string): Promise<RecipeIngredient[]> {

    const ingredientArray = [];
    const query = this.recipesingredientsCollection.ref.where('recipeID', '==', recipeID);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.log('no data found');
      return ingredientArray;
    } else {
      console.log('no unique data');
      querySnapshot.forEach(documentSnapshot => {
        ingredientArray.push(documentSnapshot.data());
        // ref.id    oder .data
      });
    }

    return ingredientArray;

  }



}
