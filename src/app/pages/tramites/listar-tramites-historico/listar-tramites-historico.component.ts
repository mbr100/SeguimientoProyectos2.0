import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MostrarconsultorfnComponent} from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import {MostrarexpertoComponent} from "@components/proyectos/mostrarexperto/mostrarexperto.component";
import {Tramites} from "@models/tramites.model";
import {TramiteService} from "@services/tramite.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-listar-tramites-historico',
  standalone: true,
    imports: [
        DatePipe,
        MostrarconsultorfnComponent,
        MostrarexpertoComponent
    ],
  templateUrl: './listar-tramites-historico.component.html',
  styles: ``
})
export class ListarTramitesHistoricoComponent implements OnInit{
    protected tramites: Tramites[];
    public tramitesFiltrados: Tramites[];
    public numeroTramites: WritableSignal<number> = signal<number>(0);
    constructor(private tramiteService: TramiteService, private router: Router) {
        this.tramites = new Array<Tramites>();
        this.tramitesFiltrados = new Array<Tramites>();
    }

    public ngOnInit(): void {
        this.tramiteService.obtenerTramitesHistorico().subscribe({
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

}
