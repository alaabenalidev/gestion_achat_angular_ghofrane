import {Categorie} from "./Categorie";

export interface Produit {
  id_Produit: number,
  type: String,
  reference: String,
  description: String,
  prix: String,
  categorie: Categorie
}
