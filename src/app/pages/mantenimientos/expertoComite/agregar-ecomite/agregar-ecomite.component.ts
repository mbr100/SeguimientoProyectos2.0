import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router} from "@angular/router";
import { ExpertoComiteService } from "@services/experto-comite.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-agregar-ecomite',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './agregar-ecomite.component.html',
    styles: ``
})
export class AgregarEComiteComponent {
    expertoComiteForm: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private expertoComiteService: ExpertoComiteService) {
        this.expertoComiteForm = this.fb.group({
            id: [''],
            idexperto: [''],
            nombre: [''],
            apellido1: [''],
            apellido2: [''],
            email: [''],
            telefono: ['']
        });
    }

    public volverInicio(): void {
        this.router.navigate(['mantenimientos/expertos-comite/listarEcomite']).then(r => {
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
        console.log(this.expertoComiteForm.value);
        this.expertoComiteService.agregarExpertoComite(this.expertoComiteForm.value).then(_ => {
            Swal.fire({
                title: 'Experto Comité añadido',
                text: 'El experto técnico se ha añadido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(_ => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al añadir el experto comité',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            });
        }).catch(_ => {
            Swal.fire({
                title: 'Cancelado',
                text: 'Se ha cancelado la operación',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then();
        });
    }
}
