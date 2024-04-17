import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ExpertoComite} from "../../../../models/experto-comite.model";
import {ExpertoComiteService} from "../../../../services/experto-comite.service";

@Component({
  selector: 'app-listar-ecomite',
  standalone: true,
  imports: [],
  templateUrl: './listar-ecomite.component.html',
  styles: ``
})
export class ListarEComiteComponent implements OnInit{
    public expertosComite!: ExpertoComite[];
    public expertosComiteBusqueda!: ExpertoComite[];
    public buscando: boolean;
    constructor(private expertoComiteService: ExpertoComiteService, private router: Router) {
        this.buscando = false;
        this.expertosComite = [];
    }

    ngOnInit(): void {
        this.expertoComiteService.getExpertosComite().subscribe(expertosTecnicos => {
            this.expertosComite = expertosTecnicos;
            this.expertosComite.sort((a: ExpertoComite, b: ExpertoComite) => a.idexperto! - b.idexperto!);
        });
    }

    public buscar(value: string): void {
        this.buscando = true;
        this.expertosComiteBusqueda = this.expertosComite.filter(experto => experto.nombre!.includes(value));
    }

    public get numeroExpertosTecnicos(): number {
        return this.expertosComite.length;
    }

    public agregarET(): void {
        this.router.navigateByUrl('mantenimientos/expertos-comite/anadirEcomite').then();
    }

    public editarET(experto: ExpertoComite): void {
        this.router.navigateByUrl(`mantenimientos/expertos-comite/editarEcomite/${experto.id}`).then();
    }

    public eliminarET(experto: ExpertoComite) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás recuperar el experto técnico',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.expertoComiteService.eliminarExpertoComite(experto).then(_ => {
                    Swal.fire({
                        title: 'Experto técnico eliminado',
                        text: 'El experto técnico se ha eliminado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then();
                }).catch(_ => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al eliminar el experto técnico',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then();
                });
            }
        });
    }
}
