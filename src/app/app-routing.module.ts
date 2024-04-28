import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/client/list/list.component';
import { CreateComponent } from './components/client/create/create.component';
import { UpdateComponent } from './components/client/update/update.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { AdminGuard } from './Guard/admin/admin.guard';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { CreateProduitComponent } from './components/produit/create-produit/create-produit.component';
import { UpdateProduitComponent } from './components/produit/update-produit/update-produit.component';
import {CreateCategorieComponent} from "./components/categorie/create/create_categorie.component";
import {UpdateCategorieComponent} from "./components/categorie/update/update-categorie.component";
import {ListCategorieComponent} from "./components/categorie/list/list-categorie.component";

const routes: Routes = [
  {path:"",component:HomeComponent},

  {
    path: 'admin',
    component: LayoutClientComponent,
    canActivate:[AdminGuard],
    children: [
      { path: 'client/list', component: ListComponent },
      { path: 'client/create', component: CreateComponent },
      { path: 'client/edit/:id', component: UpdateComponent },
      { path: 'produit/list', component: ListProduitComponent },
      { path: 'produit/create', component: CreateProduitComponent },
      { path: 'produit/edit/:id', component: UpdateProduitComponent },
      { path: 'categorie/list', component: ListCategorieComponent },
      { path: 'categorie/create', component: CreateCategorieComponent },
      { path: 'categorie/edit/:id', component: UpdateCategorieComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
