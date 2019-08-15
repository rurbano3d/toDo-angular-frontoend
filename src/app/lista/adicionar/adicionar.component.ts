import { ActivatedRoute } from '@angular/router';
import { ListaService } from "./../lista.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: "app-adicionar",
  templateUrl: "./adicionar.component.html",
  styleUrls: ["./adicionar.component.css"]
})
export class AdicionarComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private listaService: ListaService,
    private location: Location,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {

    const lista = this.route.snapshot.data['lista'];

    this.form = this.fb.group({
      id: [lista.id],
      nome: [lista.nome, [Validators.required, Validators.minLength(3)]],
      
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

 

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log("submit");
     
      if (this.form.value.id) {
        console.log("update");
        this.listaService.editar(this.form.value).subscribe(
          success => {
            alert("Editado com sucesso!"), this.location.back();
          },
          //success => this.modal.showAlertSucess('Gravado com sucesso!),
          error => alert("Não foi editado, contate o administrador do sistema!"),
          //error => this.modal.showAlertDanger('Erro ao gravar, tente novamente!),
          () => console.log("request completo")
        )
      } else {
        this.listaService.adicionar(this.form.value).subscribe(
          success => {
            alert("Gravado com sucesso!"), this.location.back();
          },
          //success => this.modal.showAlertSucess('Gravado com sucesso!),
          error => alert("Não foi gravado, contate o administrador do sistema!"),
          //error => this.modal.showAlertDanger('Erro ao gravar, tente novamente!),
          () => console.log("request completo")
        );
      }
    }
  }
}
