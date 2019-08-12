import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
// import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection: AngularFirestoreCollection < Recipe > ;
  recipesIngredientsCollection: AngularFirestoreCollection < RecipeIngredient > ;
  recipes: Observable < Recipe[] > ;
  recipeIngredientDoc: AngularFirestoreDocument < RecipeIngredient > ;
  // recipesingredients: Observable<RecipeIngredient[]>;
  // recipeDoc: AngularFirestoreDocument<Recipe>;
  // private recipeID: string;
  // private qurey: any;

  constructor(public afs: AngularFirestore) {
    // grab recipesCol and recipesIngredientsCol(reference collection)
    this.recipesCollection = this.afs.collection('recipes', ref => ref.orderBy('title', 'asc'));
    this.recipesIngredientsCollection = this.afs.collection('recipes_ingredients', ref => ref.orderBy('recipeID', 'asc'));

    this.fetchDocumentID();

  }

  // fetch Document with ID
  fetchDocumentID() {
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
    return this.recipes;
  }

  // return recipe from recipeID
  // science request runs parallel, async handling necessary
  async getRecipe(recipeID: string): Promise < Recipe > {

    const docRef = this.recipesCollection.doc < Recipe > (recipeID);

    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return doc.data() as Recipe;
    }
    return null;



  }



  // add recipe
  addRecipe(recipe: Recipe, selectedIngredients: string[], selectedIngredientsQuantities: number[]) {
    this.recipesCollection.add(recipe).then(docRef => {

      // science relation between recipes and ingredients is stored in additional collection, iteration is necessary
      for (let i = 0; i < selectedIngredients.length; i++) {
        this.recipesIngredientsCollection.add({
          recipeID: docRef.id,
          ingredientID: selectedIngredients[i],
          quantity: +selectedIngredientsQuantities[i]
        });
      }
    });


  }


  // return recipeIngredient from recipeID
  // science request runs parallel, async handling necessary
  async getIngredients(recipeID: string): Promise < RecipeIngredient[] > {

    const ingredientArray = [];
    const query = this.recipesIngredientsCollection.ref.where('recipeID', '==', recipeID);
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
