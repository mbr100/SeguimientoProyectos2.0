import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import { map, Observable } from "rxjs";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$!: Observable<firebase.User|null>;
    public isLoggedIn: boolean = false;

    constructor(private authService: AngularFireAuth, private router: Router) {
        this.user$ = authService.authState;
        this.user$.subscribe((user: firebase.User | null): void => {
            this.isLoggedIn = !!user;
        });
    }

    public login(email: string, password: string): Promise<UserCredential> {
        return new Promise((resolve, reject): void => {
            this.authService.signInWithEmailAndPassword(email, password)
                .then((datos: UserCredential) => resolve(datos),
                    error => reject(error));
        });
    }

    public getAuth(): Observable<firebase.User| null> {
        return this.authService.authState.pipe(
            map( (auth: firebase.User | null) => auth)
        );
    }

    public updateImageProfile(image: string): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.authService.currentUser.then((user: firebase.User | null ) => {
                user?.updateProfile({photoURL: image})
                    .then(() => resolve(), error => reject(error))
                    .catch(error => reject(error));
            });
        });
    }

    public logout(): void {
        this.authService.signOut().then((): void => {
            this.router.navigate(['/login']).then(() =>
                Swal.fire({
                    icon: 'success',
                    title: 'Sesión cerrada',
                    showConfirmButton: false,
                    timer: 1500
                })
            );
        });
    }

    public updateDisplayName(displayName: string): Promise<void>  {
        return new Promise<void>((resolve, reject): void => {
            this.authService.currentUser.then((user: firebase.User | null): void => {
                user?.updateProfile({displayName})
                    .then(() => resolve(), error => reject(error))
                    .catch(error => reject(error));
            });
        });
    }

    public updateEmail(email: string): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            this.authService.currentUser.then((user: firebase.User | null): void => {
                user?.updateEmail(email)
                    .then(() => resolve(), error => reject(error))
                    .catch(error => reject(error));
            });
        });
    }

    public updatePassword(password: string): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            this.authService.currentUser.then((user: firebase.User | null): void => {
                user?.updatePassword(password)
                    .then(() => resolve(), error => reject(error))
                    .catch((error) => reject(error));
            });
        });
    }
}
