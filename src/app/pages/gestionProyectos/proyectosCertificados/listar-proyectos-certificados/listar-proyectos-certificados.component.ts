import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ProyectoService} from "../../../../services/proyecto.service";
import {Proyecto} from "../../../../models/proyecto.model";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {MostrarconsultorfnComponent} from "../../../../components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import {MostrarexpertoComponent} from "../../../../components/proyectos/mostrarexperto/mostrarexperto.component";

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

    constructor(private proyectosService: ProyectoService, private router: Router) {
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
}
