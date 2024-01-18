import {Component, OnInit} from '@angular/core';
import {ExpertoTecnicoService} from "../../../../services/experto-tecnico.service";
import {ExpertoTecnico} from "../../../../models/expertoTecnico.model";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listar-et',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './listar-et.component.html',
  styles: ``
})
export class ListarETComponent implements OnInit{
    public expertosTecnicos!: ExpertoTecnico[];
    public expertosTecnicosBusqueda!: ExpertoTecnico[];
    public buscando: boolean;
    constructor(private eTservico: ExpertoTecnicoService, private router: Router) {
        this.buscando = false;
        this.expertosTecnicos = [];
    }

    ngOnInit(): void {
        this.eTservico.getExpertosTecnicos().subscribe((expertosTecnicos: ExpertoTecnico[]): void => {
            this.expertosTecnicos = expertosTecnicos;
        });
    }

    public buscar(value: string): void {
        this.buscando = true;
        this.expertosTecnicosBusqueda = this.expertosTecnicos.filter((experto: ExpertoTecnico) => experto.nombre!.includes(value));
    }

    public get numeroExpertosTecnicos(): number {
        return this.expertosTecnicos.length;
    }

    public agregarET(): void {
        this.router.navigateByUrl('mantenimientos/expertos-tecnicos/anadirET').then();
    }

    public editarET(experto: ExpertoTecnico): void {
        this.router.navigateByUrl(`mantenimientos/expertos-tecnicos/editarET/${experto.id}`).then();
    }

    public eliminarET(experto: ExpertoTecnico) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás recuperar el experto técnico',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.eTservico.eliminarExpertoTecnico(experto).then((_: void): void => {
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
