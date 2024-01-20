import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {TipoRecurso} from "../../../../models/tipoRecurso.model";
import {Router} from "@angular/router";
import {TipoRecusoService} from "../../../../services/tipoRecuso.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listar-tipo-recurso',
  standalone: true,
  imports: [],
  templateUrl: './listar-tipo-recurso.component.html',
  styles: ``
})
export class ListarTipoRecursoComponent implements OnInit{
    private tipoRecursos: TipoRecurso[];
    public tipoRecursosMostrar: TipoRecurso[];
    public numeroTipoRecursos: WritableSignal<number>;
    public constructor(private tipoRecursoService: TipoRecusoService, private router: Router) {
        this.tipoRecursos = new Array<TipoRecurso>();
        this.tipoRecursosMostrar = new Array<TipoRecurso>();
        this.numeroTipoRecursos = signal(0);
    }

    public ngOnInit(): void {
        this.tipoRecursoService.listarTipoRecursos().subscribe((resp: TipoRecurso[]) => {
            console.log(resp);
            this.tipoRecursos = resp;
            this.tipoRecursosMostrar = resp;
            this.numeroTipoRecursos.set(resp.length);
        });
    }

    public buscar(value: string): void {
        this.tipoRecursosMostrar = this.tipoRecursos.filter((tipoRecurso: TipoRecurso) => {
            return tipoRecurso.tipoRecursp.toLowerCase().includes(value.toLowerCase());
        });
    }

    public eliminarTipoRecurso(tipoRecurso: TipoRecurso): void {
        this.tipoRecursoService.eliminarTipoRecurso(tipoRecurso.id).then((resp: boolean) => {
            if (resp) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Tipo de recurso eliminado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    this.router.navigateByUrl('tipoRecursos/listarTipoRecurso').then();
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el tipo de recurso',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            }
        });
    }

    public agregarTipoRecurso(): void {
        this.router.navigateByUrl('/mantenimientos/tipoRecurso/agregarTipoRecurso').then();
    }
}
