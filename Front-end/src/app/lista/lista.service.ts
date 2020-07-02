import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../model/list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor( private http: HttpClient) { }

  listaURL = 'http://localhost:8080/listas';

  listar(): Observable<any>{
    return this.http.get(this.listaURL);
  }

  criarLista(lista: Lista){
    return this.http.post(`${this.listaURL}`, lista);
  }

  editarLista(lista: Lista): Observable<any>{
    return this.http.put(`${this.listaURL}/${lista.codigo}`, lista);
  }

  deletarLista(codigo: number){
    return this.http.delete(`${this.listaURL}/${codigo}`);
  }

  exibirItens(codigo: number): Observable<any>{
    return this.http.get(`${this.listaURL}/${codigo}`);
  }
}
