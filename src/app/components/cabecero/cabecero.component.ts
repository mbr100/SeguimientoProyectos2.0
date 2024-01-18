import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgOptimizedImage} from "@angular/common";
import firebase from "firebase/compat";
import {AuthService} from "../../services/auth.service";

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

    public recargar(): void {
        this.router.navigateByUrl('/').then(_ => _);
    }

    public iraHisotricos(): void {
        this.router.navigateByUrl('/historicos').then();
    }

    public verPerfil(): void {
        this.router.navigateByUrl('/user').then();
    }

    public iraEstadisticas(): void {
        this.router.navigateByUrl('/estadisticas').then();
    }

    public iraArchivados(): void {
        this.router.navigateByUrl('/archivados').then();
    }
}
