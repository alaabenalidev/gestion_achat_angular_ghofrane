import {Client} from "./Client";
import {FournisseurProduit} from "./FournisseurProduit";

export interface Commande {
  id: number;
  client: Client;
  ligneCommandes: ligneCommande[];
}

export interface ligneCommande {
  id: number;
  produit: FournisseurProduit
  qte: number;
  remis: number;
}
