import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RecursosService} from "../../../services/recursos.service";
import {TipoRecusoService} from "../../../services/tipoRecuso.service";
import {TipoRecurso} from "../../../models/tipoRecurso.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-recursos',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './editar-recursos.component.html',
  styles: ``
})
export class EditarRecursosComponent implements OnInit{
    public recursosForm: FormGroup;
    public idRecurso: string;

    constructor(private router: Router, private fb: FormBuilder, private recursosService: RecursosService, private route: ActivatedRoute) {
        this.recursosForm = this.fb.group({
            id: [''],
            tipo: [''],
            contenido: [''],
            tipoProyecto: ['']
        });
        this.idRecurso = this.route.snapshot.paramMap.get('id') || '';
    }

    public ngOnInit(): void {
        this.recursosService.getRecurso(this.idRecurso).subscribe(resp => {
            this.recursosForm.setValue(resp);
        });
    }

    public volverInicio(): void {
        this.router.navigateByUrl('').then(r => {
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
        this.recursosService.actualizarRecurso(this.recursosForm.value).then(_ => {
            Swal.fire({
                title: 'Recurso Actualizado',
                text: 'El recurso se ha actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(_ => {
                this.router.navigateByUrl('mantenimientos/recursos/listarRecursos').then(r => {
                    if (!r) {
                        Swal.fire({
                            title: 'Error',
                            text: 'Ha ocurrido un error al volver a la página de inicio',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        }).then();
                    }
                });
            });
        });
    }
}
