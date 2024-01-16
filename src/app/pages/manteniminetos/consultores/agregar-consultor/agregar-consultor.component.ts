import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {ConsultoresService} from "../../../../services/consultores.service";

@Component({
    selector: 'app-agregar-consultor',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './agregar-consultor.component.html',
    styles: ``
})
export class AgregarConsultorComponent {
    public consultorForm: FormGroup;

    public constructor(private fb: FormBuilder, private router: Router, private consultorService: ConsultoresService) {
        this.consultorForm = this.fb.group({
            id: [''],
            nombre: [''],
            email: [''],
            telefono: [''],
            consultora: ['']
        });
    }

    public volverInicio(): void {
        this.router.navigate(['mantenimientos/consultores/listadoConsultores']).then(r => {
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
        this.consultorService.agregarConsultor(this.consultorForm.value).then(_ => {
            Swal.fire({
                title: 'Experto técnico añadido',
                text: 'El experto técnico se ha añadido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(_ => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al añadir el experto técnico',
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
