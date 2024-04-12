import {Component, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import firebase from "firebase/compat";

@Component({
    selector: 'app-cabecero',
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
        NgOptimizedImage
    ],
    templateUrl: './cabecero.component.html',
    styles: ``
})
export class CabeceroComponent {
    public mostrarLogOut: boolean = false;
    private _user?: firebase.User;

    constructor(private router: Router, private authService: AuthService) {
        this.authService.user$.subscribe(user => {
            this.mostrarLogOut = !!user;
            if (user) {
                this._user = user;
            }
        });
    }

    public logout(): void {
        this.authService.logout();
    }

    public iraHisotricos(): void {
        this.router.navigateByUrl('/historicos').then();
    }
    public iraArchivados(): void {
        this.router.navigateByUrl('/archivados').then();
    }

    public get photoUrl(): string {
        return this._user?.photoURL || '';
    }

    public get displayName(): string {
        return this._user?.displayName!;
    }

    public irPerfil(): void {
        this.router.navigateByUrl('/user').then();
    }

    public irATramites(): void {
        this.router.navigateByUrl('/tramites').then();
    }

    public iraEstadisticas(): void {
        this.router.navigateByUrl('/estadisticas').then();

    }
}
