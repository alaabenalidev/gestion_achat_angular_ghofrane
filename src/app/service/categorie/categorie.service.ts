import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Categorie} from "../../model/Categorie";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  apiUrl=environment.apiCategorie;

  constructor(private http:HttpClient) { }

  getAllCategorie():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(`${this.apiUrl}/List`);
  }

  getCategorieById(id:number):Observable<Categorie>{
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  saveCategorie(categorie:Categorie):Observable<Categorie>{
    return this.http.post<Categorie>(`${this.apiUrl}/create`,categorie);
  }

  updateCategorie(categorie:Categorie):Observable<Categorie>{
    return this.http.put<Categorie>(`${this.apiUrl}/${categorie.id_Categorie}`,categorie);
  }

  removeCategorie(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
