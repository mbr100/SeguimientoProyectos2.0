import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import Swal, {SweetAlertResult} from "sweetalert2";
import {Router} from "@angular/router";
import {RecursosService} from "../../../services/recursos.service";

@Component({
  selector: 'app-agregar-recursos',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './agregar-recursos.component.html',
  styles: ``
})
export class AgregarRecursosComponent {
    public recursosForm: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private recursosService: RecursosService) {
        this.recursosForm = this.fb.group({
            tipo: [''],
            contenido: [''],
            tipoProyecto: ['']
        });
    }

    public volverInicio(): void {
        this.router.navigateByUrl('mantenimientos/comites/listarComites').then(r => {
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
                title: 'Comité añadido',
                text: 'El comité se ha añadido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((_: SweetAlertResult) => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al añadir el comité',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            });
        }).catch(_ => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al añadir el comité',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then();
        });
    }
}
