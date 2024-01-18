import {CanActivateFn, Router} from '@angular/router';
import Swal from "sweetalert2";
import {map} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
    const router: Router = inject(Router);
    const afAuth: AngularFireAuth = inject(AngularFireAuth);
    return afAuth.authState.pipe(
        map (auth => {
            if (!auth) {
                router.navigateByUrl('/login').then(_ => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No tienes permisos para acceder a esta página',
                    }).then();
                });
                return false;
            }  else {
                return true;
            }
        })
    )
};
