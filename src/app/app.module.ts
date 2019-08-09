import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import {IngredientService} from './services/ingredient.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatStepperModule
} from '@angular/material';
import { AddIngredientComponent } from './components/ingredients/add-ingredient/add-ingredient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectIngredientsComponent } from './components/ingredients/select-ingredient/select-ingredients.component';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    AddIngredientComponent,
    SelectIngredientsComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
