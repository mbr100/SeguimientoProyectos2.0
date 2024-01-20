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
export class ListarTipoRecursoComponent implements OnInit {
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
            this.tipoRecursos = resp;
            this.tipoRecursosMostrar = resp;
            this.numeroTipoRecursos.set(resp.length);
        });
    }

    public buscar(value: string): void {
        this.tipoRecursosMostrar = this.tipoRecursos.filter((tipoRecurso: TipoRecurso) =>
            tipoRecurso.tipoRecursp.toLowerCase().includes(value.toLowerCase())
        );
    }

    public eliminarTipoRecurso(tipoRecurso: TipoRecurso): void {
        this.tipoRecursoService.eliminarTipoRecurso(tipoRecurso.id).then((resp: boolean) => {
            const title = resp ? 'Eliminado' : 'Error';
            const text = resp ? 'Tipo de recurso eliminado con éxito' : 'No se pudo eliminar el tipo de recurso';
            const icon = resp ? 'success' : 'error';

            Swal.fire({
                title,
                text,
                icon,
                confirmButtonText: 'Aceptar'
            }).then(() => {
                if (resp) {
                    this.router.navigateByUrl('tipoRecursos/listarTipoRecurso').then();
                }
            });
        });
    }

    public agregarTipoRecurso(): void {
        this.router.navigateByUrl('/mantenimientos/tipoRecurso/agregarTipoRecurso').then();
    }
}
