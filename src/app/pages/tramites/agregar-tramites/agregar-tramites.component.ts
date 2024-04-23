import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TramiteService} from "@services/tramite.service";
import {ConsultoresService} from "@services/consultores.service";
import {Router} from "@angular/router";
import {Consultores} from "@models/consultores.model";
import {ExpertoTecnicoService} from "@services/experto-tecnico.service";
import {ExpertoTecnico} from "@models/expertoTecnico.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-agregar-tramites',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './agregar-tramites.component.html',
    styles: ``
})
export class AgregarTramitesComponent implements OnInit {
    public tramiteForm!: FormGroup;
    public consultoras: string[];
    public consultores: Consultores[];
    public expertos: ExpertoTecnico[];
    public consultoraSelecionado: Consultores[];

    constructor(private fb: FormBuilder, private tramiteService: TramiteService, private etService: ExpertoTecnicoService, private consultoresService: ConsultoresService,
                private router: Router) {
        this.consultoras = [];
        this.consultores = [];
        this.expertos = [];
        this.consultoraSelecionado = [];
    }

    ngOnInit() {
        this.tramiteForm = this.fb.group({
            codigo: [''],
            titulo: [''],
            cliente: [''],
            fechaInicioTramite: [new Date()],
            fechaFinTramite: [null],
            fechaEntrega: [null],
            expertoTecnico: [''],
            consultor: [''],
            analisis: [''],
            estado: ['ACTIVO']
        });
        this.consultoresService.getConsultores().subscribe({
            next: consultores => {
                this.consultores = consultores;
                this.consultoras = Array.from(new Set(consultores
                    .map(consultor => consultor.consultora)
                    .filter(consultora => consultora !== undefined))) as string[];
            },
            error: err => {
                Swal.fire('Error', 'Error al cargar los consultores' + err, 'error').then();
            },
            complete: () => {
                console.log('complete');
            }
        });
        this.etService.getExpertosTecnicos().subscribe({
            next: (expertos: ExpertoTecnico[]): void => {
                this.expertos = expertos;
                this.expertos.sort((a: ExpertoTecnico, b: ExpertoTecnico) => a.idexperto! - b.idexperto!);
            },
            error: err => {
                Swal.fire('Error', 'Error al cargar los expertos técnicos' + err, 'error').then();
            },
            complete: () => {
                console.log('complete');
            }
        });
    }

    public volverInicio(): void {
        this.router.navigate(['/tramites']).then();
    }

    public agregar(): void {
        this.tramiteService.agregarTramite(this.tramiteForm.value).then(_ => {
            this.router.navigate(['/tramites']).then();
        });
    }

    public mostrarConsultores(consultora: HTMLSelectElement): void {
        this.consultoraSelecionado = this.consultores.filter(consultor => consultor.consultora === consultora.value);
    }
}
