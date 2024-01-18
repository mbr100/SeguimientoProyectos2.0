import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ComitesService} from "../../../../services/comites.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-editar-comites',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './editar-comites.component.html',
  styles: ``
})
export class EditarComitesComponent implements OnInit{
    public idComite: string;
    public comiteForm!: FormGroup;

    constructor(private route: ActivatedRoute, private comiteService: ComitesService, private fb: FormBuilder, private router: Router) {
        this.idComite = this.route.snapshot.paramMap.get('id') || '';
        this.comiteService.obtenerComite(this.idComite).subscribe(resp => {
            this.comiteForm.setValue(resp);
            console.log(resp);
        });
    }

    ngOnInit() {
        this.comiteForm = this.fb.group({
            id: [''],
            nombre: [''],
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

    public editarComite(): void {
        this.comiteService.editarComite(this.comiteForm.value).then(() => {
            Swal.fire({
                title: 'Éxito',
                text: 'El comité se ha editado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(r => {
                if (r.isConfirmed) {
                    this.volverInicio();
                }
            });
        }).catch(() => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al editar el comité',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then();
        });
    }
}
