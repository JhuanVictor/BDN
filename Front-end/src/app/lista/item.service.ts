import { Observable } from 'rxjs';
import { Item } from './../model/item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( private http: HttpClient) { }

  itemUrl = 'http://localhost:8080/item';

  criarItem(item: Item): Observable<any>{
    return this.http.post(this.itemUrl, item);
  }

  editarItem(item: Item): Observable<any>{
    return this.http.put(`${this.itemUrl}/${item.codigo}`, item);
  }

  deletarItem(codigo: number): Observable<any>{
    return this.http.delete(`${this.itemUrl}/${codigo}`);
  }

  concluirItem(codigo: number): Observable<any>{
    return this.http.delete(`${this.itemUrl}/${codigo}/finalizar`);
  }
}
