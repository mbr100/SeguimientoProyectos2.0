import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import Swal, {SweetAlertResult} from "sweetalert2";
import {Router} from "@angular/router";
import {RecursosService} from "@services/recursos.service";
import {TipoRecurso} from "@models/tipoRecurso.model";
import {TipoRecusoService} from "@services/tipoRecuso.service";

@Component({
  selector: 'app-agregar-recursos',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './agregar-recursos.component.html',
  styles: ``
})
export class AgregarRecursosComponent implements OnInit{
    public recursosForm: FormGroup;
    public tipoRecursos: TipoRecurso[];
    constructor(private router: Router, private fb: FormBuilder, private recursosService: RecursosService, private tipoRecursoService: TipoRecusoService) {
        this.recursosForm = this.fb.group({
            tipo: [''],
            contenido: [''],
            tipoProyecto: ['']
        });
        this.tipoRecursos = new Array<TipoRecurso>();
    }

    public ngOnInit(): void {
        this.tipoRecursoService.listarTipoRecursos().subscribe((tipoRecursos: TipoRecurso[]) => {
            this.tipoRecursos = tipoRecursos;
        });
    }

    public volverInicio(): void {
        this.router.navigateByUrl('recursos/listarRecursos').then(r => {
            if (!r) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al volver a la página de inicio',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            }
        });
    }

    public agregar(): void {
        this.recursosService.agregarRecurso(this.recursosForm.value).then(_ => {
            Swal.fire({
                title: 'Recurso añadido',
                text: 'El comité se ha añadido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((_: SweetAlertResult) => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al añadir el recurso',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            });
        }).catch(_ => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al añadir el recursos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then();
        });
    }
}
