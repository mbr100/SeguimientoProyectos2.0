import {Component} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ExpertoTecnicoService} from "@services/experto-tecnico.service";

@Component({
    selector: 'app-agregar-et',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './agregar-et.component.html',
    styles: ``
})
export class AgregarETComponent {
    expertoTecnicoForm: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private expertoTecnicoService: ExpertoTecnicoService) {
        this.expertoTecnicoForm = this.fb.group({
            id: [''],
            idexperto: [''],
            nombre: [''],
            apellido1: [''],
            apellido2: [''],
            email: [''],
            telefono: ['']
        });
    }

    volverInicio() {
        this.router.navigate(['mantenimientos/expertos-tecnicos/listarET/']).then(r => {
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
        console.log(this.expertoTecnicoForm.value);
        this.expertoTecnicoService.agregarExpertoTecnico(this.expertoTecnicoForm.value).then(_ => {
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
