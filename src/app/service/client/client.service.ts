import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiClient;

  constructor(private http: HttpClient) {
  }

  getAllClinet(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/List`);
  }

  getAllClientByIdCategorie(idCategorie: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/${idCategorie}/categorie`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/create`, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
