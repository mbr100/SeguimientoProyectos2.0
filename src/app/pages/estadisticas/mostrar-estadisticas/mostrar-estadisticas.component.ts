import { Component, OnInit } from '@angular/core';
import { ProyectoService } from "../../../services/proyecto.service";
import { Proyecto } from "../../../models/proyecto.model";
import {CurrencyPipe, DatePipe, DecimalPipe} from "@angular/common";
import { Estadisticas } from "../../../models/estadisticas.model";
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-mostrar-estadisticas',
    standalone: true,
    imports: [DatePipe, DecimalPipe, CurrencyPipe, FormsModule],
    templateUrl: './mostrar-estadisticas.component.html',
    styleUrl: './mostrar-estadisticas.component.css'
})
export class MostrarEstadisticasComponent implements OnInit {
    private proyectos: Proyecto[];
    public estadisticas: Estadisticas[];
    public mediaDiasComite: number;
    public mediaDiasCertificacion: number;
    public precioMedioOferta: number;
    public proyectosEquivalentes: number;

    public constructor(private proyectosService: ProyectoService) {
        this.proyectos = [];
        this.estadisticas = [];
        this.mediaDiasComite = 0;
        this.mediaDiasCertificacion = 0;
        this.precioMedioOferta = 0;
        this.proyectosEquivalentes = 0;
    }

    public ngOnInit(): void {
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
        this.estadisticas = this.proyectos.map((proyecto: Proyecto): Estadisticas => {
            const fecha1Comite: Date | undefined = proyecto.fechaComite ? new Date(proyecto.fechaComite) : undefined;
            const fecha2Comite: Date | undefined = proyecto.fechaFinComite ? new Date(proyecto.fechaFinComite) : undefined;
            const diferenciaEnMilisegundosComite: number = fecha2Comite!.getTime() - fecha1Comite!.getTime();
            const diasEnComite: number = diferenciaEnMilisegundosComite / 86400000;
            const fecha1Certificacion: Date | undefined = proyecto.fechaInicioProyecto ? new Date(proyecto.fechaInicioProyecto) : undefined;
            const fecha2Certificacion: Date | undefined = proyecto.fechaFinProyecto ? new Date(proyecto.fechaFinProyecto) : undefined;
            const diferenciaEnMilisegundosCertificacion: number = fecha2Certificacion!.getTime() - fecha1Certificacion!.getTime();
            const diasCertificacion: number = diferenciaEnMilisegundosCertificacion / 86400000;
            return {
                Acronimo: proyecto.acronimo!,
                Codigo: proyecto.codigo!,
                FechaInicio: proyecto.fechaInicioProyecto!,
                FechaInicioComite: proyecto.fechaComite!,
                FechaFinComite: proyecto.fechaFinComite!,
                FechaFinProyecto: proyecto.fechaFinProyecto!,
                diasComite: diasEnComite,
                precioOferta: proyecto.precioOfertado!,
                diasCertificacion: diasCertificacion,
                versionComite: proyecto.numeroVersionComite!
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

    public calcularProyectosMedios():void {
        this.proyectosEquivalentes = this.estadisticas.reduce((total, proyecto) => {
            return total + proyecto.precioOferta;
        }, 0) / this.precioMedioOferta;

    }
}
