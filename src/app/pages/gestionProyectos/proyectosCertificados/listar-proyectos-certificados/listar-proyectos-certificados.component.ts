import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProyectoService } from "@services/proyecto.service";
import { Proyecto } from "@models/proyecto.model";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { MostrarconsultorfnComponent } from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import { MostrarexpertoComponent } from "@components/proyectos/mostrarexperto/mostrarexperto.component";
import { Tramites } from "@models/tramites.model";
import { TramiteService } from "@services/tramite.service";

import Swal from "sweetalert2";


@Component({
    selector: 'app-listar-proyectos-certificados',
    standalone: true,
    imports: [
        DatePipe,
        MostrarconsultorfnComponent,
        MostrarexpertoComponent
    ],
    templateUrl: './listar-proyectos-certificados.component.html',
    styles: ``
})
export class ListarProyectosCertificadosComponent implements OnInit {
    private proyectosCertificados: Proyecto[];
    public proyectosCertificadosMostar: Proyecto[];
    public numeroProyectosCertificados: WritableSignal<number> = signal<number>(0);

    constructor(private proyectosService: ProyectoService, private router: Router, private tramiteService: TramiteService) {
        this.proyectosCertificados = [];
        this.proyectosCertificadosMostar = [];
    }

    ngOnInit() {
        this.proyectosService.getProyectosCertificados().subscribe(proyectos => {
            this.proyectosCertificados = proyectos;
            this.proyectosCertificadosMostar = proyectos;
            this.numeroProyectosCertificados.set(proyectos.length);
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

    public buscar(value: string): void {
        this.proyectosCertificadosMostar = this.proyectosCertificados.filter(proyecto => proyecto.codigo!.includes(value));
    }

    public creartramite(proyecto: Proyecto):void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de que quieres crear un trámite para el proyecto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, crear trámite',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                let tramite: Tramites = {
                    id: proyecto.id,
                    codigo: proyecto.codigo,
                    titulo: proyecto.titulo,
                    cliente: proyecto.cliente,
                    fechaInicioTramite: new Date(),
                    fechaFinTramite: null,
                    fechaEntrega: null,
                    expertoTecnico: proyecto.expertoTecnico,
                    consultor: proyecto.consultor,
                    analisis: "",
                    estado: "ACTIVO"
                };
                this.tramiteService.agregarTramite(tramite).then(() => {
                    this.router.navigate(['/tramites']).then();
                });
            }
        });
    }
}
