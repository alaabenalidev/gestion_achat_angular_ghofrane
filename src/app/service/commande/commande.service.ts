import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../model/Produit';
import {FournisseurProduit} from "../../model/FournisseurProduit";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiUrl=environment.apiCommande;

  constructor(private http:HttpClient) { }

  getAllCommande():Observable<FournisseurProduit[]>{
    return this.http.get<FournisseurProduit[]>(`${this.apiUrl}/list`);
  }

  saveCommand(items:FournisseurProduit[]):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create`,items);
  }

  updateProduit(produit:Produit):Observable<Produit>{
    return this.http.put<Produit>(`${this.apiUrl}/${produit.id_Produit}`,produit);
  }

  removeProduit(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
