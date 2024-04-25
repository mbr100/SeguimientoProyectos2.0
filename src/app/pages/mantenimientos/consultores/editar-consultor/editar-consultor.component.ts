import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ConsultoresService} from "@services/consultores.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-editar-consultor',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './editar-consultor.component.html',
    styles: ``
})
export class EditarConsultorComponent implements OnInit {
    public idConsultor: string;
    public consultorForm!: FormGroup;

    public constructor(private route: ActivatedRoute, private consultorService: ConsultoresService, private fb: FormBuilder, private router: Router) {
        this.idConsultor = this.route.snapshot.paramMap.get('id') || '';
        this.consultorService.getConsultor(this.idConsultor).subscribe(resp => {
            this.consultorForm.setValue(resp);
            console.log(resp);
        });
    }

    public ngOnInit(): void {
        this.consultorForm = this.fb.group({
            id: [''],
            nombre: [''],
            email: [''],
            telefono: [''],
            consultora: ['']
        });
    }

    public actualizar(): void {
        this.consultorService.actualizarConsultor(this.consultorForm.value).then(_ => {
            Swal.fire({
                title: 'Consultor actualizado',
                text: 'El Consultor se ha actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(_ => {
                this.volverInicio();
            }).catch(_ => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al actualizar el Consultor',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then();
            });
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
}
