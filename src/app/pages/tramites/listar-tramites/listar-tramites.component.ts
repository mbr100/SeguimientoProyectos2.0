import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {TramiteService} from "../../../services/tramite.service";
import {Tramites} from "../../../models/tramites.model";
import {MostrarconsultorfnComponent} from "../../../components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import {MostrarexpertoComponent} from "../../../components/proyectos/mostrarexperto/mostrarexperto.component";
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
    templateUrl: './listar-tramites.component.html',
    styleUrl: './listar-tramites.component.css'
})
export class ListarTramitesComponent implements OnInit {
    protected tramites: Tramites[];
    numeroProyectos: WritableSignal<number> = signal<number>(0);
    constructor(private tramiteService: TramiteService, private router: Router) {
        this.tramites = new Array<Tramites>();
    }

    ngOnInit(): void {
        this.tramiteService.obtenerTramites().subscribe(tramites => {
            this.tramites = tramites;
            this.numeroProyectos.set(tramites.length);
        });
    }

    public buscar(value: string): void {

    }

    public seguimientoTramite(tramite: Tramites): void {
        this.router.navigateByUrl(`/tramites/seguimiento/${tramite.id}`).then(r => {});
    }

    public eliminarTramite(tramite: Tramites) {
        this.tramiteService.eliminarTramite(tramite.id!).then(r => {
            this.tramites = this.tramites.filter(t => t.id !== tramite.id);
        });
    }
}
