import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpertoComiteService} from "../../../../services/experto-comite.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-ecomite',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './editar-ecomite.component.html',
  styles: ``
})
export class EditarEComiteComponent implements OnInit{
    expertoComiteForm!: FormGroup;
    public idExperto: string;

    constructor(private router: Router, private fb: FormBuilder, private expertoComiteService: ExpertoComiteService, private route: ActivatedRoute) {
        this.idExperto = this.route.snapshot.paramMap.get('id') || '';
        console.log(this.idExperto);
        this.expertoComiteService.getExpertoComite(this.idExperto).subscribe(resp => {
            this.expertoComiteForm.setValue(resp);
            console.log(resp);
        });
    }

    ngOnInit() {
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

    volverInicio() {
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

    public editarEComite(): void {
        console.log(this.expertoComiteForm.value);
        this.expertoComiteService.actualizarExpertoComite(this.expertoComiteForm.value).then(_ => {
            Swal.fire({
                title: 'Experto Comité Actualizado',
                text: 'El experto técnico se ha actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(_ => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al actualizar el experto comité',
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
