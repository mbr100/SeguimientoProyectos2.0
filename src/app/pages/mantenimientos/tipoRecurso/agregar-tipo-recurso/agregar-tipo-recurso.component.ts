import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TipoRecusoService} from "../../../../services/tipoRecuso.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agregar-tipo-recurso',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './agregar-tipo-recurso.component.html',
  styles: ``
})
export class AgregarTipoRecursoComponent {
    public tipoRecursoForm: FormGroup;

    constructor(private fb: FormBuilder, private tipoRecursoService: TipoRecusoService, private router: Router) {
        this.tipoRecursoForm = this.fb.group({
            id: [''],
            tipoRecursp: [''],
        });
    }

    public agregar(): void {
        this.tipoRecursoService.agregarTipoRecurso(this.tipoRecursoForm.value).then(_ => {
            Swal.fire({
                title: 'Tipo de recurso añadido',
                text: 'El tipo de recurso se ha añadido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((_) => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al añadir el tipo de recurso',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            });
        }).catch(_ => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al añadir el tipo de recurso',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then();
        });
    }

    public volverInicio(): void {
        this.router.navigateByUrl('mantenimientos/tipoRecursos/listarTipoRecurso').then(r => {
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
}
