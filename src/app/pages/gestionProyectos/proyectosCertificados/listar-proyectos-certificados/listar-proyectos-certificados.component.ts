import {Component, OnInit} from '@angular/core';
import {ProyectoService} from "../../../../services/proyecto.service";
import {Proyecto} from "../../../../models/proyecto.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-listar-proyectos-certificados',
    standalone: true,
    imports: [
        DatePipe
    ],
    templateUrl: './listar-proyectos-certificados.component.html',
    styles: ``
})
export class ListarProyectosCertificadosComponent implements OnInit {
    public proyectosCertificados: Proyecto[];

    constructor(private proyectosService: ProyectoService, private router: Router) {
        this.proyectosCertificados = [];
    }

    ngOnInit() {
        this.proyectosService.getProyectosCertificados().subscribe(proyectos => {
            this.proyectosCertificados = proyectos;
        });
    }

    public desarchivarProyecto(proyecto: Proyecto) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de que quieres descertificar el proyecto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, desarchivar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                proyecto.estado = 'ACTIVO';
                this.proyectosService.actualizarProyecto(proyecto).then(() => {
                    this.router.navigate(['/']).then();
                });
            }
        });
    }
}
