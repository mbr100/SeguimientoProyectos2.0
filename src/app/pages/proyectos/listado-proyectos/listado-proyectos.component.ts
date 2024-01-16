import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Proyecto} from "../../../models/proyecto.model";
import {ProyectoService} from "../../../services/proyecto.service";
import {Consultores} from "../../../models/consultores.model";

@Component({
  selector: 'app-listado-proyectos',
  standalone: true,
    imports: [
        DatePipe,
        RouterLink
    ],
  templateUrl: './listado-proyectos.component.html',
  styleUrl: './listado-proyectos.component.css'
})
export class ListadoProyectosComponent implements OnInit{
    public proyectos: Proyecto[];
    public proyectosBusqueda: Proyecto[];
    public consultores: Consultores[];
    public busqueda: boolean;

    constructor(private proyectoService: ProyectoService, private router: Router) {
        this.proyectos = [];
        this.consultores = [];
        this.busqueda = false;
        this.proyectosBusqueda = [];
    }

    ngOnInit() {
        this.proyectoService.getProyectos().subscribe(proyectos => {
            this.proyectos = proyectos;
        });
    }

    public agregarProyectos(): void {
        this.router.navigateByUrl('proyectos/agregarProyecto').then();
    }

    public seguimientoProyecto(proyecto: Proyecto): void {
        this.router.navigateByUrl('proyectos/seguimientoProyecto/' + proyecto.id).then();
    }

    public certificarProyecto(proyecto: Proyecto): void {
        this.proyectoService.certificarProyecto(proyecto).then(() =>
            this.router.navigateByUrl('proyectos/listadoProyectos')
        );
    }

    public buscar(value: string): void {
        this.busqueda = true;
        this.proyectosBusqueda = this.proyectos.filter(proyecto => proyecto.codigo!.includes(value));
    }
}
