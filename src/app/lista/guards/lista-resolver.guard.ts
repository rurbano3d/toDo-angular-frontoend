import { ListaService } from './../lista.service';
import { listaModel } from './../lista.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class listaResolverGuard implements Resolve<listaModel> {

    constructor(private listaService: ListaService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<listaModel> {
        if (route.params && route.params['id']){
            return this.listaService.loadById(route.params['id'])
        }

        return of ({
            id:null,
            nome:null,
            status:null
        });
    }
    
}