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
// import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  ingredientsCollection: AngularFirestoreCollection < Ingredient > ;
  ingredients: Observable < Ingredient[] > ;
  itemDoc: AngularFirestoreDocument < Ingredient > ;
  selectedIngredients = [];
  selectedIngredientsQuantities: number[] = [];
  categorys = ['Obst', 'Gemüse', 'Fleisch', 'Milchprodukte', 'Basics', 'Sonstiges'];
  units = ['g', 'ml', 'Stück', 'TL', 'EL'];

  constructor(public afs: AngularFirestore) {
    // grab ingredients asc
    this.ingredientsCollection = this.afs.collection('ingredients', ref => ref.orderBy('category', 'asc'));

    this.fetchDocumentID();
  }

  // fetch Document with ID
  fetchDocumentID() {
    this.ingredients = this.ingredientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Ingredient;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  // return observable
  getIngredients() {
    this.fetchDocumentID();
    return this.ingredients;
  }

  // return collection
  getIngredientsCol() {
    return this.ingredientsCollection.valueChanges();
  }



  // return ingredient from ingredientID
  // science request runs parallel, async handling necessary
  async getIngredient(ingredientID: string): Promise < Ingredient > {
    const docRef = this.ingredientsCollection.doc(ingredientID);
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return doc.data() as Ingredient;
    }
    return null;
  }


  addIngredient(ingredient: Ingredient) {
    this.ingredientsCollection.add(ingredient);
  }

  // science selectIngredients-component stores data in ingredientService, setter and getter are necessary
  setSelectedIngredients(ingredients, quantities: number[]) {
    this.selectedIngredients = ingredients;
    this.selectedIngredientsQuantities = quantities;
  }

  // science selectIngredients-component stores data in ingredientService, setter and getter are necessary
  getSelectedIngredients() {
    return this.selectedIngredients;
  }

  // science selectIngredients-component stores data in ingredientService, setter and getter are necessary
  getSelectedIngredientsQuantities() {
    return this.selectedIngredientsQuantities;
  }

  getCategorys(): string[] {
    return this.categorys;
  }

  getUnits(): string[] {
    return this.units;
  }

}
