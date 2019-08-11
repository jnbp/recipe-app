import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewRecipesComponent} from './components/recipes/overview-recipes/overview-recipes.component';
import {AddRecipeComponent} from './components/recipes/add-recipe/add-recipe.component';
import {DetailRecipeComponent} from './components/recipes/detail-recipe/detail-recipe.component';

const routes: Routes = [
  { path: 'recipes', component: OverviewRecipesComponent},
  { path: 'add', component: AddRecipeComponent},
  { path: 'recipe/:id', component: DetailRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [OverviewRecipesComponent, AddRecipeComponent]
