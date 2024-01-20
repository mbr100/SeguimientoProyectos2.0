import { Component } from '@angular/core';
import Swal from "sweetalert2";
import firebase from "firebase/compat";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UploadFileService} from "../../services/upload-file.service";
import {NgOptimizedImage} from "@angular/common";

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
export class UserComponent {
    private _user?: firebase.User;
    public userForm!: FormGroup;


    constructor(private userService: AuthService, private uploadFileService: UploadFileService, private fb: FormBuilder) {
        this.userService.user$.subscribe(user => {
            if (user) {
                this._user = user;
                this.userForm.setValue({
                    displayName: this._user.displayName,
                    email: this._user.email,
                    password: '',
                });
            }
        });
    }
    ngOnInit(): void {
        this.userForm = this.fb.group({
            displayName: [this._user?.displayName, Validators.required],
            email: [this._user?.email, Validators.required],
            password: ['', Validators.required],
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
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();})
            .then((urlImage) => {
                return this.userService.updateImageProfile(urlImage);})
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

        const updateDisplayName = displayName !== this._user?.displayName ? this.userService.updateDisplayName(displayName) : Promise.resolve();
        const updateEmail = email !== this._user?.email ? this.userService.updateEmail(email) : Promise.resolve();
        const updatePassword = password ? this.userService.updatePassword(password) : Promise.resolve();

        Promise.all([updateDisplayName, updateEmail, updatePassword])
            .then(() => this.showSuccessMessage('Perfil actualizado'))
            .catch(() => this.showErrorMessage('Error al actualizar el perfil'));
    }
}
