import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../model/Produit';
import {FournisseurProduit} from "../../model/FournisseurProduit";

@Injectable({
  providedIn: 'root'
})
export class FournisseurProduitService {

  apiUrl=environment.apiFournisseurProduit;

  constructor(private http:HttpClient) { }

  getAllProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiUrl}/list`);
  }

  getFournisseurProduitByProduitId(id:number):Observable<FournisseurProduit[]>{
    return this.http.get<FournisseurProduit[]>(`${this.apiUrl}/${id}/produit`);
  }

  saveFournisseurProduit(items:FournisseurProduit[]):Observable<FournisseurProduit[]>{
    return this.http.post<FournisseurProduit[]>(`${this.apiUrl}/create`,items);
  }

  updateProduit(produit:Produit):Observable<Produit>{
    return this.http.put<Produit>(`${this.apiUrl}/${produit.id_Produit}`,produit);
  }

  removeProduit(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
