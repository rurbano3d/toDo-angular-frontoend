import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { listaModel } from './lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private url="http://127.0.0.1:8000";

  httpHeaders = new HttpHeaders ({
    'Content-Type':'aplication/json',
    
  })
  
  constructor(private http: HttpClient) { }

 

  getLista() : Observable<any>{
    return this.http.get(`${this.url}/lista/`);
  }

  loadById(id){
    return this.http.get<listaModel>(`${this.url}/lista/${id}/`).pipe(take(1));
  }

  adicionar(lista) {
    return this.http.post(this.url + '/lista/',lista).pipe(take(1));
  }

  editar(lista){
    return this.http.put(`${this.url}/lista/${lista.id}/`,lista).pipe(take(1));
  }
 
  deletar(id){
      return this.http.delete(`${this.url}/lista/${id}/`).pipe(take(1));
  }

  check(lista){
    if(lista.status == true){
      return this.http.put(`${this.url}/lista/${lista.id}/`,
    {
      "nome":lista.nome,
      "status":false
    }).pipe(take(1));
    }else{
      return this.http.put(`${this.url}/lista/${lista.id}/`,
    {
      "nome":lista.nome,
      "status":true
    }).pipe(take(1));
    }
    
}
  
}
