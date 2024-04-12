import {Component, OnInit} from '@angular/core';
import {ProyectoService} from "../../../services/proyecto.service";
import {Proyecto} from "../../../models/proyecto.model";
import Swal from "sweetalert2";
import {DatePipe, DecimalPipe} from "@angular/common";
import {Estadisticas} from "../../../models/estadisticas.model";

@Component({
  selector: 'app-mostrar-estadisticas',
  standalone: true,
    imports: [
        DatePipe,
        DecimalPipe
    ],
  templateUrl: './mostrar-estadisticas.component.html',
  styleUrl: './mostrar-estadisticas.component.css'
})
export class MostrarEstadisticasComponent implements OnInit{
    private proyectos: Proyecto[];
    public estadisticas: Estadisticas[];
    public mediaDiasComite: number;
    public mediaDiasCertificacion: number;
    constructor(private proyectosService: ProyectoService) {
        this.proyectos = [];
        this.estadisticas = [];
        this.mediaDiasComite = 0;
        this.mediaDiasCertificacion = 0;
    }

    ngOnInit(): void {
        this.proyectosService.getProyectosCertificados().subscribe({
            next: (proyectos: Proyecto[]) => {
                this.proyectos = proyectos;
                this.generarEstadisticas();
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.error.message
                }).then();
            }
        });
    }
    private generarEstadisticas(): void {
        this.estadisticas = this.proyectos.map((proyecto: Proyecto) => {
            const fecha1Comite: Date | undefined = proyecto.fechaComite ? new Date(proyecto.fechaComite) : undefined;
            const fecha2Comite: Date | undefined = proyecto.fechaFinComite ? new Date(proyecto.fechaFinComite) : undefined;
            const diferenciaEnMilisegundosComite: number = fecha2Comite!.getTime() - fecha1Comite!.getTime();
            const diasEnComite: number = diferenciaEnMilisegundosComite / 86400000;
            const fecha1Certificacion: Date | undefined = proyecto.fechaInicioProyecto ? new Date(proyecto.fechaInicioProyecto) : undefined;
            const fecha2Certificacion: Date | undefined = proyecto.fechaFinProyecto ? new Date(proyecto.fechaFinProyecto) : undefined;
            const diferenciaEnMilisegundosCertificacion: number = fecha2Certificacion!.getTime() - fecha1Certificacion!.getTime();
            const diasCertificacion: number = diferenciaEnMilisegundosCertificacion / 86400000;
            return {
                Acronimo: proyecto.acronimo || "", // Asignar un valor predeterminado si es undefined
                Codigo: proyecto.codigo || "", // Asignar un valor predeterminado si es undefined
                FechaInicio: proyecto.fechaInicioProyecto || new Date(), // Asignar una fecha predeterminada si es undefined
                FechaInicioComite: proyecto.fechaComite || new Date(), // Asignar una fecha predeterminada si es undefined
                FechaFinComite: proyecto.fechaFinComite || new Date(), // Asignar una fecha predeterminada si es undefined
                FechaFinProyecto: proyecto.fechaFinProyecto || new Date(), // Asignar una fecha predeterminada si es undefined
                diasComite: diasEnComite,
                diasCertificacion: diasCertificacion,
                versionComite: proyecto.numeroVersionComite !== undefined ? proyecto.numeroVersionComite : 0 // Asignar un valor predeterminado si es undefined
            };
        });
        if (this.estadisticas.length !== 0) {
            this.mediaDiasComite = this.calcularMediaDias(this.estadisticas, 'FechaInicioComite', 'FechaFinComite');
            this.mediaDiasCertificacion = this.calcularMediaDias(this.estadisticas, 'FechaInicio', 'FechaFinProyecto');
        }
    }

    private calcularMediaDias(estadisticas: any[], fechaInicioKey: string, fechaFinKey: string): number {
        const totalDias = estadisticas.reduce((total, proyecto) => {
            const fechaInicio: Date = new Date(proyecto[fechaInicioKey]);
            const fechaFin: Date = new Date(proyecto[fechaFinKey]);
            const diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();
            const diferenciaEnDias: number = diferenciaEnMilisegundos / 86400000;
            return total + diferenciaEnDias;
        }, 0);
        return totalDias / estadisticas.length;
    }

}
