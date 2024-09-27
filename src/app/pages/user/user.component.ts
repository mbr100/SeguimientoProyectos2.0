import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@services/auth.service";
import {UploadFileService} from "@services/upload-file.service";
import {NgOptimizedImage} from "@angular/common";
import {Proyecto} from "@models/proyecto.model";
import {ProyectoService} from "@services/proyecto.service";

import Swal from "sweetalert2";
import firebase from "firebase/compat";
import {AvisoService} from "@services/aviso.service";
import {Comite} from "@models/comite.model";
import {ComitesService} from "@services/comites.service";
import {ConsultoresService} from "@services/consultores.service";
import {ExpertoComiteService} from "@services/experto-comite.service";
import {ExpertoTecnicoService} from "@services/experto-tecnico.service";
import {RecursosService} from "@services/recursos.service";
import {TipoRecusoService} from "@services/tipoRecuso.service";
import {TramiteService} from "@services/tramite.service";
import {Consultores} from "@models/consultores.model";
import {ExpertoComite} from "@models/experto-comite.model";
import {ExpertoTecnico} from "@models/expertoTecnico.model";
import {Recurso} from "@models/recurso.model";
import {TipoRecurso} from "@models/tipoRecurso.model";
import {Tramites} from "@models/tramites.model";
import {Aviso} from "@models/aviso.model";
import {combineLatest} from "rxjs";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgOptimizedImage
    ],
    templateUrl: './user.component.html',
    styles: ``
})
export class UserComponent implements OnInit {
    private _user?: firebase.User;
    public userForm!: FormGroup;
    private data: {
        proyectos: Proyecto[],
        comites: Comite[],
        consultores: Consultores[],
        expertosComite: ExpertoComite[],
        expertosTecnicos: ExpertoTecnico[],
        recursos: Recurso[],
        tiposRecursos: TipoRecurso[],
        tramites: Tramites[],
        avisos: Aviso[]
    };

    constructor(private userService: AuthService, private uploadFileService: UploadFileService, private fb: FormBuilder, private proyectoService: ProyectoService,
                private comiteService: ComitesService, private consultorService: ConsultoresService, private expertorComiteService: ExpertoComiteService, private avisoService: AvisoService,
                private etService: ExpertoTecnicoService, private recursosService: RecursosService, private tipoRecusoService: TipoRecusoService, private tramiteService: TramiteService) {
        this.userService.user$.subscribe({
            next: (user: firebase.User | null) => {
                if (user) {
                    this._user = user;
                    this.userForm.setValue({
                        displayName: this._user.displayName,
                        email: this._user.email,
                        password: '',
                    });
                }
            },
            error: (error): void => {
                this.showErrorMessage('Error al cargar el usuario: ' + error);
            },
        });
        this.data = { proyectos: [], comites: [], consultores: [], expertosComite: [], expertosTecnicos: [], recursos: [], tiposRecursos: [], tramites: [], avisos: [] };
    }

    public ngOnInit(): void {
        this.userForm = this.fb.group({
            displayName: [this._user?.displayName, Validators.required],
            email: [this._user?.email, Validators.required],
            password: ['', Validators.required],
        });
        combineLatest([
            this.proyectoService.getProyectosBuckup(),
            this.comiteService.listarComites(),
            this.consultorService.getConsultores(),
            this.expertorComiteService.getExpertosComite(),
            this.etService.getExpertosTecnicos(),
            this.recursosService.getRecursos(),
            this.tipoRecusoService.listarTipoRecursos(),
            this.tramiteService.obtenerTramites(),
            this.avisoService.listarAvisos()
        ]).subscribe({
            next: ([proyectos, comites, consultores, expertosComite, expertosTecnicos, recursos, tiposRecursos, tramites, avisos]) => {
                this.data = {
                    proyectos,
                    comites,
                    consultores,
                    expertosComite,
                    expertosTecnicos,
                    recursos,
                    tiposRecursos,
                    tramites,
                    avisos
                };
            },
            error: (error) => {
                this.showErrorMessage('Error al cargar los datos: ' + error);
            }
        });
    }

    public get verImagen(): string | null | undefined {
        return this._user?.photoURL;
    }

    public cambiarImagen(file: File): void {
        console.log(file);

        this.uploadFileService.subirImagenUsuario(file, this._user!.uid)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(urlImage => this.userService.updateImageProfile(urlImage))
            .then(() => this.showMessage('Imagen actualizada', 'success'))
            .catch(() => this.showMessage('Error al actualizar la imagen', 'error'));
    }

    private showSuccessMessage(title: string): void {
        this.showMessage(title, 'success');
    }

    private showErrorMessage(title: string): void {
        this.showMessage(title, 'error');
    }

    private showMessage(title: string, icon: 'success' | 'error'): void {
        Swal.fire({
            title,
            icon,
            showConfirmButton: false,
            timer: 1500,
        }).then();
    }

    public actualizarPerfil(): void {
        const {displayName, email, password} = this.userForm.value;

        const updateDisplayName: Promise<void> = displayName !== this._user?.displayName ? this.userService.updateDisplayName(displayName) : Promise.resolve();
        const updateEmail: Promise<void> = email !== this._user?.email ? this.userService.updateEmail(email) : Promise.resolve();
        const updatePassword: Promise<void> = password ? this.userService.updatePassword(password) : Promise.resolve();

        Promise.all([updateDisplayName, updateEmail, updatePassword])
            .then(() => this.showSuccessMessage('Perfil actualizado'))
            .catch(() => this.showErrorMessage('Error al actualizar el perfil'));
    }

    public backup(): void {
        const jsonString = JSON.stringify(this.data);
        const blob = new Blob([jsonString], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'datos.json'; // Nombre del archivo JSON
        a.click();

        window.URL.revokeObjectURL(url);
    }
}
