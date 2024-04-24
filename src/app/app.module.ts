import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule if needed

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/client/list/list.component';
import { CreateComponent } from './components/client/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './components/client/update/update.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { CreateProduitComponent } from './components/produit/create-produit/create-produit.component';
import { UpdateProduitComponent } from './components/produit/update-produit/update-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    HomeComponent,
    NavbarComponent,
    UpdateComponent,
    LayoutClientComponent,
    ListProduitComponent,
    CreateProduitComponent,
    UpdateProduitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    ReactiveFormsModule,
    FormsModule,
    CommonModule, // Add CommonModule here
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
