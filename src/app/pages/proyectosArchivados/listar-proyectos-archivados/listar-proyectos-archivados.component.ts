import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Proyecto} from "../../../models/proyecto.model";
import {ProyectoService} from "../../../services/proyecto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-proyectos-archivados',
  standalone: true,
    imports: [
        DatePipe
    ],
  templateUrl: './listar-proyectos-archivados.component.html',
  styles: ``
})
export class ListarProyectosArchivadosComponent implements OnInit{
    public proyectosArchivados: Proyecto[];

    constructor(private proyectosService: ProyectoService, private router: Router) {
        this.proyectosArchivados = [];
    }

    ngOnInit(): void {
        this.proyectosService.getProyectosArchivados().subscribe(proyectos => {
            this.proyectosArchivados = proyectos;
        });
    }
}
