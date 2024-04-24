import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../model/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  apiUrl=environment.apiProduit;

  constructor(private http:HttpClient) { }

  getAllProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiUrl}/list`);
  }

  getProduitById(id:number):Observable<Produit>{
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  saveProduit(produit:Produit):Observable<Produit>{
    return this.http.post<Produit>(`${this.apiUrl}/create`,produit);
  }

  updateProduit(produit:Produit):Observable<Produit>{
    return this.http.put<Produit>(`${this.apiUrl}/${produit.id_Produit}`,produit);
  }

  removeProduit(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
