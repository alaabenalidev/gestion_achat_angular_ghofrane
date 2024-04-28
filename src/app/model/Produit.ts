import {Categorie} from "./Categorie";
import {Client} from "./Client";

export interface Produit {
  id_Produit: number,
  type: String,
  reference: String,
  description: String,
  prix: String,
  categorie: Categorie
  client: Client
}
