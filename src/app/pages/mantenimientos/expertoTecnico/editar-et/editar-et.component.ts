import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpertoTecnicoService} from "../../../../services/experto-tecnico.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-et',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './editar-et.component.html',
  styles: ``
})
export class EditarETComponent implements OnInit{
    expertoTecnicoForm!: FormGroup;
    public idExperto: string;

    constructor(private router: Router, private fb: FormBuilder, private expertoTecnicoService: ExpertoTecnicoService, private route: ActivatedRoute) {
        this.idExperto = this.route.snapshot.paramMap.get('id') || '';
        this.expertoTecnicoService.getExpertoTecnico(this.idExperto).subscribe(resp => {
            this.expertoTecnicoForm.setValue(resp);
            console.log(resp);
        });
    }

    ngOnInit() {
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

    public editar(): void {
        this.expertoTecnicoService.actualizarExpertoTecnico(this.expertoTecnicoForm.value).then(_ => {
            Swal.fire({
                title: 'Experto técnico Actualizado',
                text: 'El experto técnico se ha actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(_ => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al actualizar el experto técnico',
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
