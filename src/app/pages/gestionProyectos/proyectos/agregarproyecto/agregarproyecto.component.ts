import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ProyectoService } from "@services/proyecto.service";
import { Router } from "@angular/router";
import { Consultores } from "@models/consultores.model";
import { ConsultoresService } from "@services/consultores.service";
import { CheckListBonis } from "@models/checkListBonis.model";
import { CheckListBonisService } from "@services/check-list-bonis.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-agregarproyecto',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './agregarproyecto.component.html',
    styles: ``
})
export class AgregarproyectoComponent implements OnInit {
    public proyectoForm!: FormGroup;
    public consultoras: string[] = [];
    public consultoraSelecionado: Consultores[] = [];
    public consultores!: Consultores[];
    private checkListBonis: CheckListBonis;

    constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private router: Router, private consultoresService: ConsultoresService,
                private checkListBonisService: CheckListBonisService) {
        this.consultoresService.getConsultores().subscribe(consultores => {
            this.consultores = consultores;
            this.consultoras = Array.from(new Set(consultores
                .map(consultor => consultor.consultora)
                .filter(consultora => consultora !== undefined))) as string[];
        });
        this.checkListBonis = new CheckListBonis();
    }

    ngOnInit() {
        this.proyectoForm = this.fb.group({
            codigo: ['', Validators.required, Validators.pattern(/^\d{3}\.\d{3}$/)],
            acronimo: ['', Validators.required, Validators.pattern(/^.{10}$/)],
            titulo: ['', Validators.required],
            cliente: ['', Validators.required],
            ejercicio: ['', Validators.required],
            fechaInicioProyecto: [new Date()],
            fechaFinProyecto: [null],
            fechaComite: [null],
            fechaFinComite: [null],
            coordinadorComite: [''],
            numeroVersionComite: [null],
            expertoTecnico: [''],
            experto2Tecnico: [''],
            experto4D: [''],
            experto4D2: [''],
            consultor: [''],
            estado: ['ACTIVO'],
            IMV: [''],
            codigoUnesco: [''],
            anoCertificacion: [new Date().getFullYear()],
            precioOfertado: [0],
            proyectoPrincipal: [true],
            tipoProyecto: ['Deducciones']
        });
    }

    public volverInicio(): void {
        this.router.navigate(['/']).then();
    }

    public agregar(): void {
            if(this.proyectoForm.value.tipoProyecto=='Bonificaciones') {
                this.proyectoService.agregarProyecto(this.proyectoForm.value).then(rest => {
                    this.checkListBonis.idProyecto = rest.id;
                    this.checkListBonisService.agregarCheckListBonis(this.checkListBonis).then(_ => {
                        this.router.navigate(['/']).then();
                    });
                });
            } else if(this.proyectoForm.value.tipoProyecto=='Deducciones') {
                this.proyectoService.agregarProyecto(this.proyectoForm.value).then(_ => {
                    this.router.navigate(['/']).then();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Tipo de proyecto no válido'
                }).then();
            }
    }

    public mostrarConsultores(consultora: HTMLSelectElement): void {
        this.consultoraSelecionado = this.consultores.filter(consultor => consultor.consultora === consultora.value);
    }
    get f(): { [key: string]: AbstractControl } {
        return this.proyectoForm.controls;
    }
}
