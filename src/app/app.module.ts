import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import {IngredientService} from './services/ingredient.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule, MatGridListModule,
  MatInputModule,
  MatListModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { AddIngredientComponent } from './components/ingredients/add-ingredient/add-ingredient.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectIngredientsComponent } from './components/ingredients/select-ingredient/select-ingredients.component';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';
import { OverviewRecipesComponent } from './components/recipes/overview-recipes/overview-recipes.component';
import {RecipeService} from './services/recipe.service';
import {CartService} from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DetailRecipeComponent } from './components/recipes/detail-recipe/detail-recipe.component';
import { FabComponent } from './components/fab/fab.component';

@NgModule({
  entryComponents: [
    CartComponent,
    AddIngredientComponent,
    SelectIngredientsComponent
  ],
  declarations: [
    AppComponent,
    IngredientsComponent,
    AddIngredientComponent,
    SelectIngredientsComponent,
    CartComponent,
    routingComponents,
    ToolbarComponent,
    DetailRecipeComponent,
    FabComponent
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
    ReactiveFormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers: [
    IngredientService,
    RecipeService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
