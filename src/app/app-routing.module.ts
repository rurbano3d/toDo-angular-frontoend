import { listaModel } from './lista/lista.model';
import { ListaComponent } from './lista/lista.component';
import { AdicionarComponent } from './lista/adicionar/adicionar.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { listaResolverGuard } from './lista/guards/lista-resolver.guard';


const routes: Routes = [
  { path: '', component: ListaComponent },
  {
    path: 'adicionar', component: AdicionarComponent, resolve: {
      lista: listaResolverGuard
    }
  },
  {
    path: 'editar/:id', component: AdicionarComponent, resolve: {
      lista: listaResolverGuard
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
