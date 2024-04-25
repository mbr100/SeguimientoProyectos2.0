import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Proyecto } from "@models/proyecto.model";
import { ProyectoService } from "@services/proyecto.service";
import { MostrarconsultorfnComponent } from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import { MostrarexpertoComponent } from "@components/proyectos/mostrarexperto/mostrarexperto.component";

@Component({
    selector: 'app-listar-proyectos-archivados',
    standalone: true,
    imports: [
        DatePipe,
        MostrarconsultorfnComponent,
        MostrarexpertoComponent
    ],
    templateUrl: './listar-proyectos-archivados.component.html',
    styles: ``
})
export class ListarProyectosArchivadosComponent implements OnInit {
    private proyectosArchivados: Proyecto[];
    public proyectosArchivadosMostar: Proyecto[];
    public numeroProyectosArchivados: WritableSignal<number> = signal<number>(0);

    constructor(private proyectosService: ProyectoService) {
        this.proyectosArchivados = new Array<Proyecto>();
        this.proyectosArchivadosMostar = new Array<Proyecto>();
    }

    ngOnInit(): void {
        this.proyectosService.getProyectosArchivados().subscribe(proyectos => {
            this.proyectosArchivados = proyectos;
            this.proyectosArchivadosMostar = proyectos;
            this.numeroProyectosArchivados.set(proyectos.length);
        });
    }

    public buscar(value: string): void {
        this.proyectosArchivadosMostar = this.proyectosArchivados.filter(proyecto => proyecto.codigo!.includes(value));
        this.numeroProyectosArchivados.set(this.proyectosArchivadosMostar.length);
        this.proyectosArchivadosMostar.sort((a, b) => a.codigo!.localeCompare(b.codigo!));
    }
}
