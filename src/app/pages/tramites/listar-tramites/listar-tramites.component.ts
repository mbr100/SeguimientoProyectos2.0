import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TramiteService } from "@services/tramite.service";
import { Tramites } from "@models/tramites.model";
import { MostrarconsultorfnComponent } from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import { MostrarexpertoComponent } from "@components/proyectos/mostrarexperto/mostrarexperto.component";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

@Component({
    selector: 'app-listar-tramites',
    standalone: true,
    imports: [
        MostrarconsultorfnComponent,
        MostrarexpertoComponent,
        DatePipe
    ],
    templateUrl: './listar-tramites.component.html'
})
export class ListarTramitesComponent implements OnInit {
    protected tramites: Tramites[];
    public tramitesFiltrados: Tramites[];
    public numeroTramites: WritableSignal<number> = signal<number>(0);
    constructor(private tramiteService: TramiteService, private router: Router) {
        this.tramites = new Array<Tramites>();
        this.tramitesFiltrados = new Array<Tramites>();
    }

    public ngOnInit(): void {
        this.tramiteService.obtenerTramites().subscribe({
            next: (tramites: Tramites[]) => {
                this.tramites = tramites;
                this.tramitesFiltrados = tramites;
                this.tramitesFiltrados.sort((a, b) => a.codigo!.localeCompare(b.codigo!));
                this.numeroTramites.set(tramites.length);
            },
            error: (error: any) => {
                console.error(error);
            },
            complete: () => {
                console.log('Completado');
            }
        });
    }

    public buscar(value: string): void {
        this.tramitesFiltrados = this.tramites.filter(tramite => tramite.codigo!.includes(value));
        this.tramitesFiltrados.sort((a, b) => a.codigo!.localeCompare(b.codigo!));
        this.numeroTramites.set(this.tramitesFiltrados.length);
    }

    public seguimientoTramite(tramite: Tramites): void {
        this.router.navigateByUrl(`/tramites/seguimiento/${tramite.id}`).then(() => {});
    }

    public eliminarTramite(tramite: Tramites): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (tramite.id != null) {
                    this.tramiteService.eliminarTramite(tramite.id).then(() => {
                        Swal.fire('Eliminado', 'El trámite ha sido eliminado', 'success').then(() => {
                            this.tramites = this.tramites.filter(t => t.id !== tramite.id);
                            this.numeroTramites.set(this.tramites.length);
                        });
                        this.tramites = this.tramites.filter(t => t.id !== tramite.id);
                        this.numeroTramites.set(this.tramites.length);
                    }).catch((error: any) => {
                        Swal.fire('Error', 'Ha ocurrido un error al eliminar el trámite', 'error').then(() =>{
                            console.error(error);
                        });
                        console.error(error);
                    });
                }
            }
        }).catch((error: any) => {
            console.error(error);
        });
    }

    public agregarTramite(): void {
        this.router.navigateByUrl('/tramites/agregar-tramites').then();
    }

    public diasRestantes(fechaFinTramite: Date): number {
        const fechaActual: number = new Date().getTime();
        const fechaDada: number = new Date(fechaFinTramite).getTime();// Convertir el timestamp dado a milisegundos
        // Calcular la diferencia en milisegundos
        const diferenciaEnMilisegundos: number = fechaActual - fechaDada;
        // Convertir la diferencia en días
        return Math.abs(Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)));
    }
}
