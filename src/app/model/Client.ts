import {Categorie} from "./Categorie";

export interface Client{
  id:number,
  nom:String,
  prenom:String,
  adresse:String,
  num_tel:String,
  ville:String,
  categorie: Categorie
}
