import {Client} from "./Client";
import {Produit} from "./Produit";

export interface FournisseurProduit {
  id: number;
  fournisseur: Client;
  produit: Produit;
  prix: number;
  quantite:number;
  remis: number;
}
