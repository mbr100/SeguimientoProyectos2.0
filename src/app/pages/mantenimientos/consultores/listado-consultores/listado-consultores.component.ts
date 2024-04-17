import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ConsultoresService} from "../../../../services/consultores.service";
import {Consultores} from "../../../../models/consultores.model";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listado-consultores',
  standalone: true,
  imports: [],
  templateUrl: './listado-consultores.component.html',
  styles: ``
})
export class ListadoConsultoresComponent implements OnInit{
    public numeroConsultores: WritableSignal<number> = signal<number>(0);
    public consultores: Consultores[];
    public consultoresBusqueda: Consultores[];
    public buscando: boolean;

    constructor(private consultoresService: ConsultoresService, private router: Router) {
        this.consultores = [];
        this.buscando = false;
        this.consultoresBusqueda = [];
    }

    ngOnInit(): void {
        this.consultoresService.getConsultores().subscribe((consultores: Consultores[]): void => {
            this.consultores = consultores;
            this.consultores.sort((a: Consultores, b: Consultores) => a.consultora!.toLowerCase().localeCompare(b.consultora!.toLowerCase()));
            this.numeroConsultores.set(consultores.length);
        });
    }

    public buscar(value: string): void {
        this.buscando = true;
        this.consultoresBusqueda = this.consultores.filter((consultores: Consultores) => consultores.nombre!.includes(value));
    }
    public editarConsultor(consultor: Consultores): void {
        this.router.navigateByUrl(`mantenimientos/consultores/editarConsultor/${consultor.id}`).then(r => r);
    }

    public eliminarConsultor(consultor: Consultores): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás recuperar el experto técnico',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result): void => {
            if (result.isConfirmed) {
                this.consultoresService.eliminarConsultor(consultor).then((): void => {
                    this.consultoresService.getConsultores().subscribe((consultores: Consultores[]): void => {
                        this.consultores = consultores;
                        this.numeroConsultores.set(consultores.length);
                    });
                }).then((): void => {
                    Swal.fire({
                        title: 'Experto técnico eliminado',
                        text: 'El experto técnico ha sido eliminado correctamente',
                        icon: 'success'
                    }).then(r => r);
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'El experto técnico no ha sido eliminado',
                    'error'
                ).then(r => r);
            }
        });
    }

    public agregarConsultor(): void {
        this.router.navigateByUrl('/mantenimientos/consultores/agregarConsultor').then((r: boolean) => r);
    }
}
