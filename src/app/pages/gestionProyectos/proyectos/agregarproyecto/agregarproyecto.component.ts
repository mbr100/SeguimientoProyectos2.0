import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProyectoService} from "../../../../services/proyecto.service";
import {Router} from "@angular/router";
import {Consultores} from "../../../../models/consultores.model";
import {ConsultoresService} from "../../../../services/consultores.service";

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
export class AgregarproyectoComponent implements OnInit{
    public proyectoForm!: FormGroup;
    public consultoras: string[] = [];
    public consultoraSelecionado: Consultores[] = [];
    public consultores!: Consultores[];
    constructor(private fb: FormBuilder, private proyectoService: ProyectoService, private router: Router, private consultoresService: ConsultoresService) {
        this.consultoresService.getConsultores().subscribe(consultores => {
            this.consultores = consultores;
            this.consultoras = Array.from(new Set(consultores
                .map(consultor => consultor.consultora)
                .filter(consultora => consultora !== undefined))) as string[];
            console.log(this.consultoras);
        });
    }

    ngOnInit() {
        this.proyectoForm = this.fb.group({
            codigo: [''],
            acronimo: [''],
            titulo: [''],
            cliente: [''],
            ejercicio: [''],
            fechaInicioProyecto: [new Date()],
            fechaFinProyecto: [null],
            fechaComite: [null],
            fechaFinComite: [null],
            coordinadorComite: [''],
            numeroVersionComite: [null],
            expertoTecnico: [''],
            experto4D: [''],
            consultor: [''],
            estado: ['ACTIVO'],
            IMV: [''],
            codigoUnesco: [''],
            anoCertificacion: [new Date().getFullYear()],
            precioOfertado: [0],
            proyectoPrincipal: [],
            tipoProyecto: ['Deducciones']
        });
    }

    public volverInicio(): void {
        this.router.navigate(['/']).then();
    }

    public agregar(): void {
         this.proyectoService.agregarProyecto(this.proyectoForm.value).then(_ => {
             this.router.navigate(['/']).then();
         });
    }

    public mostrarConsultores(consultora: HTMLSelectElement): void {
        this.consultoraSelecionado = this.consultores.filter(consultor => consultor.consultora === consultora.value);
    }
}
