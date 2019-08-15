import { Observable } from 'rxjs';
import { ListaService } from './lista.service';
import { Component, OnInit } from '@angular/core';
import { listaModel } from './lista.model';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  listamodel: Observable<listaModel[]>;

  constructor(private listaService: ListaService,private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.listar();
    
  }

  listar(){
    this.listamodel = this.listaService.getLista();
    
  }

  onEditar(id){
    
    this.router.navigate(['editar',id],{ relativeTo: this.route});
  }

 

  
  
  onCheck(lista){
  
   this.listaService.check(lista)
    .subscribe(
      success => {
        alert("Tarefa finalizada com sucesso!"),
        this.listar();
      },
      error => alert("Erro!")
     
    );
  }

  onDeletar(id){
    this.listaService.deletar(id)
    .subscribe(
      success => {
        alert("Removido com sucesso!"), location.reload();
      },
      error => alert("Erro!")
     
    );
  }

}
