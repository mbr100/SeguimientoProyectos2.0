import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { Proyecto } from "@models/proyecto.model";
import { ProyectoService } from "@services/proyecto.service";
import { Consultores } from "@models/consultores.model";
import { MostrarconsultorfnComponent } from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import { MostrarexpertoComponent } from "@components/proyectos/mostrarexperto/mostrarexperto.component";
import Swal from "sweetalert2";

@Component({
    selector: 'app-listado-proyectos',
    standalone: true,
    imports: [
        DatePipe,
        RouterLink,
        MostrarconsultorfnComponent,
        MostrarexpertoComponent
    ],
    templateUrl: './listado-proyectos.component.html',
    styleUrl: './listado-proyectos.component.css'
})
export class ListadoProyectosComponent implements OnInit {
    private proyectos: Proyecto[];
    public proyectosMostrar: Proyecto[];
    public consultores: Consultores[];
    public busqueda: boolean;
    public numeroProyectos: WritableSignal<number> = signal<number>(0);


    constructor(private proyectoService: ProyectoService, private router: Router) {
        this.proyectos = new Array<Proyecto>();
        this.consultores = new Array<Consultores>();
        this.busqueda = false;
        this.proyectosMostrar = new Array<Proyecto>();
    }
    public ngOnInit(): void {
        this.proyectoService.getProyectos().subscribe(proyectos => {
            this.proyectos = proyectos;
            this.proyectosMostrar = proyectos;
            this.numeroProyectos.set(proyectos.length);
        });
    }

    public agregarProyectos(): void {
        this.router.navigateByUrl('proyectos/agregarProyecto').then();
    }

    public seguimientoProyecto(proyecto: Proyecto): void {
        this.router.navigateByUrl('proyectos/seguimientoProyecto/' + proyecto.id).then();
    }

    public certificarProyecto(proyecto: Proyecto): void {
        Swal.fire({
            title: '¿Está seguro de certificar el proyecto?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Certificar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                proyecto.fechaFinProyecto = new Date();
                this.proyectoService.certificarProyecto(proyecto).then(() =>
                    this.router.navigateByUrl('proyectos/listadoProyectos')
                );
            }
            if (result.isDismissed) {
                Swal.fire({
                    title: 'Certificación cancelada',
                    text: 'El proyecto no ha sido certificado',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                }).then();
            }
        });
        }

    public buscar(value: string): void {
        this.busqueda = true;
        this.proyectosMostrar = this.proyectos.filter(proyecto => proyecto.codigo!.includes(value));
    }
}
