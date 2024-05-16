import { Component, OnInit } from '@angular/core';
import { ProyectoService } from "@services/proyecto.service";
import { Proyecto } from "@models/proyecto.model";
import { CurrencyPipe, DatePipe, DecimalPipe } from "@angular/common";
import { Estadisticas } from "@models/estadisticas.model";
import { FormsModule } from "@angular/forms";

import Swal from "sweetalert2";

@Component({
    selector: 'app-mostrar-estadisticas',
    standalone: true,
    imports: [DatePipe, DecimalPipe, CurrencyPipe, FormsModule],
    templateUrl: './mostrar-estadisticas.component.html',
    styleUrl: './mostrar-estadisticas.component.css'
})
export class MostrarEstadisticasComponent implements OnInit {
    private proyectos: Proyecto[];
    private proyectosAnualidad: Proyecto[];
    public estadisticas: Estadisticas[];
    public mediaDiasComite: number;
    public mediaDiasCertificacion: number;
    public precioMedioOferta: number;
    public proyectosEquivalentes: number;
    public anualidades: number[];
    public anualidad: number;
    public estadisticasMostrar: Estadisticas[];


    public constructor(private proyectosService: ProyectoService) {
        this.proyectos = [];
        this.proyectosAnualidad = [];
        this.estadisticas = [];
        this.mediaDiasComite = 0;
        this.mediaDiasCertificacion = 0;
        this.precioMedioOferta = 0;
        this.proyectosEquivalentes = 0;
        this.anualidades = this.anualidadesDisponibles();
        this.anualidad = new Date().getFullYear();
        this.estadisticasMostrar = [];
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

    private anualidadesDisponibles(): Array<number> {
        const anoActual: number = new Date().getFullYear();
        const anualidadInicial: number = 2023;
        return Array.from({ length: anoActual - anualidadInicial + 1 }, (_, index) => anualidadInicial + index);
    }

    public generarEstadisticas(): void {
         this.proyectosAnualidad= this.proyectos.filter((proyecto: Proyecto) => {
            return new Date(proyecto.fechaFinProyecto!).getFullYear() === Number(this.anualidad);
        });
        this.estadisticas = this.proyectosAnualidad.map((proyecto: Proyecto): Estadisticas => {
            const diasEnComite: number = this.calcularDiasEntreFechas(proyecto.fechaComite!, proyecto.fechaFinComite!);
            const diasCertificacion: number = this.calcularDiasEntreFechas(proyecto.fechaInicioProyecto, proyecto.fechaFinProyecto!);
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
        } else {
            this.mediaDiasComite = 0;
            this.mediaDiasCertificacion = 0;
        }
    }

    private calcularDiasEntreFechas(fechaInicio: Date | undefined, fechaFin: Date | undefined): number {
        if (!fechaInicio || !fechaFin) return 0;
        const diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();
        return diferenciaEnMilisegundos / (1000 * 60 * 60 * 24); // Convertir de milisegundos a días
    }

    private calcularMediaDias(estadisticas: any[], fechaInicioKey: string, fechaFinKey: string): number {
        const totalDias = estadisticas.reduce((total, proyecto) => {
            const dias: number = this.calcularDiasEntreFechas(new Date(proyecto[fechaInicioKey]), new Date(proyecto[fechaFinKey]));
            return total + dias;
        }, 0);
        return totalDias / estadisticas.length;
    }

    public calcularProyectosMedios(): void {
        this.proyectosEquivalentes = this.estadisticas.reduce((total, proyecto) => {
            return total + proyecto.precioOferta;
        }, 0) / this.precioMedioOferta;

    }
}
