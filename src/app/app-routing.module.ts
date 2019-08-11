import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewRecipesComponent} from './components/recipes/overview-recipes/overview-recipes.component';
import {AddRecipeComponent} from './components/recipes/add-recipe/add-recipe.component';

const routes: Routes = [
  { path: '', component: OverviewRecipesComponent},
  { path: 'new', component: AddRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OverviewRecipesComponent, AddRecipeComponent]
