import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {TramiteService} from "@services/tramite.service";
import {Tramites} from "@models/tramites.model";
import {MostrarconsultorfnComponent} from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import {MostrarexpertoComponent} from "@components/proyectos/mostrarexperto/mostrarexperto.component";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

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
    public numeroTramites: WritableSignal<number> = signal<number>(0);
    constructor(private tramiteService: TramiteService, private router: Router) {
        this.tramites = new Array<Tramites>();
    }

    ngOnInit(): void {
        this.tramiteService.obtenerTramites().subscribe({
            next: (tramites: Tramites[]) => {
                this.tramites = tramites;
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

    }

    public seguimientoTramite(tramite: Tramites): void {
        this.router.navigateByUrl(`/tramites/seguimiento/${tramite.id}`).then(r => {});
    }

    public eliminarTramite(tramite: Tramites): void {
        this.tramiteService.eliminarTramite(tramite.id!).then(r => {
            this.tramites = this.tramites.filter(t => t.id !== tramite.id);
        });
    }

    public agregarTramite(): void {
        this.router.navigateByUrl('/tramites/agregar-tramites').then();
    }

    diasRestantes(fechaFinTramite: Date): number {
        const fechaActual: number = new Date().getTime();
        // Convertir el timestamp dado a milisegundos
        const fechaDada: number = new Date(fechaFinTramite).getTime();

        // Calcular la diferencia en milisegundos
        const diferenciaEnMilisegundos: number = fechaActual - fechaDada;

        // Convertir la diferencia en días
        return Math.abs(Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)));
    }
}
