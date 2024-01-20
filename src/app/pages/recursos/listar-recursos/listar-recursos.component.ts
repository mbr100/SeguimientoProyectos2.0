import {Component, OnInit} from '@angular/core';
import {RecursosService} from "../../../services/recursos.service";
import {Recurso} from "../../../models/recurso.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-recursos',
  standalone: true,
  imports: [],
  templateUrl: './listar-recursos.component.html',
  styles: ``
})
export class ListarRecursosComponent implements OnInit{
    private recursos: Recurso[];
    public recursosMostar: Recurso[];
    public constructor(private recursosService: RecursosService, private router: Router) {
        this.recursos = new Array<Recurso>();
        this.recursosMostar = new Array<Recurso>();
    }

    public ngOnInit(): void {
        this.recursosService.getRecursos().subscribe((recursos: Recurso[]) => {
            this.recursos = recursos;
            this.recursosMostar = recursos;
        });
    }

    public buscar(value: string): void {
        this.recursosMostar = this.recursos.filter((recurso: Recurso) => {
            return recurso.contenido!.toLowerCase().includes(value.toLowerCase());
        });

    }

    public eliminar(recurso: Recurso): void {
        this.recursosService.deleteRecurso(recurso.id).then(_ => {
            Swal.fire({
                title: 'Eliminado',
                text: 'Tipo de recurso eliminado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                this.router.navigateByUrl('tipoRecursos/listarTipoRecurso').then();
            });
        });
    }

    public editar(recurso: Recurso): void {
        this.router.navigateByUrl(`/recursos/editarRecurso/${recurso.id}`).then();
    }
}
