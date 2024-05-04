import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { UploadFileService } from "@services/upload-file.service";
import { NgOptimizedImage } from "@angular/common";
import { Proyecto } from "@models/proyecto.model";
import { ProyectoService } from "@services/proyecto.service";
import { UploadTaskSnapshot } from "@angular/fire/compat/storage/interfaces";

import Swal from "sweetalert2";
import firebase from "firebase/compat";

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
    private proyectos: Proyecto[];


    constructor(private userService: AuthService, private uploadFileService: UploadFileService, private fb: FormBuilder, private proyectoService: ProyectoService) {
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
                Swal.fire({
                    title: 'Error al cargar el usuario '+error,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            },
        });
        this.proyectos = [];
    }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            displayName: [this._user?.displayName, Validators.required],
            email: [this._user?.email, Validators.required],
            password: ['', Validators.required],
        });
        this.proyectoService.getProyectosBuckup().subscribe(proyectos => {
            this.proyectos = proyectos;
        });
    }

    public get verImagen(): string | null | undefined {
        return this._user?.photoURL;
    }

    // public cambiarImagen(file: File): void {
    //     this.uploadFileService.subirImagenUsuario(file, this._user!.uid).then((snapshot) => {
    //         snapshot.ref.getDownloadURL().then((urlImage) => {
    //             this.userService.updateImageProfile(urlImage).then(() => {
    //                 Swal.fire({
    //                     title: 'Imagen actualizada',
    //                     icon: 'success',
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 }).then();
    //             }).catch((_) => {
    //                 Swal.fire({
    //                     title: 'Error al actualizar la imagen',
    //                     icon: 'error',
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 }).then();
    //             });
    //         });
    //     });
    // }

    public cambiarImagen(file: File): void {
        console.log(file);

        this.uploadFileService.subirImagenUsuario(file, this._user!.uid)
            .then((snapshot: UploadTaskSnapshot) => {
                return snapshot.ref.getDownloadURL();
            })
            .then((urlImage) => {
                return this.userService.updateImageProfile(urlImage);
            })
            .then(() => this.showSuccessMessage('Imagen actualizada'))
            .catch(() => this.showErrorMessage('Error al actualizar la imagen'));
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


    // public actualizarPerfil(): void {
    //     const {displayName, email, password} = this.userForm.value;
    //     if (displayName != this._user?.displayName) {
    //         this.userService.updateDisplayName(displayName).then(() => {
    //             Swal.fire({
    //                 title: 'Nombre actualizado',
    //                 icon: 'success',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             }).then();
    //         }).catch((_) => {
    //             Swal.fire({
    //                 title: 'Error al actualizar el nombre',
    //                 icon: 'error',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             }).then();
    //         });
    //     }
    //     if (email != this._user?.email) {
    //         this.userService.updateEmail(email).then(() => {
    //             Swal.fire({
    //                 title: 'Email actualizado',
    //                 icon: 'success',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             }).then();
    //         }).catch((_) => {
    //             Swal.fire({
    //                 title: 'Error al actualizar el email',
    //                 icon: 'error',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             }).then();
    //         });
    //     }
    //     if (password != '') {
    //         this.userService.updatePassword(password).then(() => {
    //             Swal.fire({
    //                 title: 'Contraseña actualizada',
    //                 icon: 'success',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             }).then();
    //         }).catch((_) => {
    //             Swal.fire({
    //                 title: 'Error al actualizar la contraseña',
    //                 icon: 'error',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             }).then();
    //         });
    //     } else {
    //         Swal.fire({
    //             title: 'No hay cambios',
    //             icon: 'info',
    //             showConfirmButton: false,
    //             timer: 1500
    //         }).then(e=> console.log(e));
    //     }
    // }

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
        const data = {
            proyectos: this.proyectos,
        }

        const jsonString = JSON.stringify(data);
        const blob = new Blob([jsonString], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'datos.json'; // Nombre del archivo JSON
        a.click();

        window.URL.revokeObjectURL(url);

    }
}
