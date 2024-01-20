import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ComitesService} from "../../../../services/comites.service";
import Swal, {SweetAlertResult} from "sweetalert2";

@Component({
  selector: 'app-agregar-comites',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './agregar-comites.component.html',
  styles: ``
})
export class AgregarComitesComponent {
    comiteForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private comiteService: ComitesService) {
        this.comiteForm = this.fb.group({
            id: [''],
            nombre: [''],
        });
    }

    public volverInicio(): void {
        this.router.navigateByUrl('mantenimientos/tipo-recurso/listarTipoRecurso').then(r => {
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
        this.comiteService.agregarComite(this.comiteForm.value).then(_ => {
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
