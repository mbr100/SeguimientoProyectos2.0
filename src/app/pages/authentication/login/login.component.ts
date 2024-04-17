import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { FormsModule } from "@angular/forms";

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{
    public email: string;
    public password: string;
    public constructor(private router: Router, private loginService: AuthService) {
        this.email = '';
        this.password = '';
    }

    public ngOnInit(): void {
        this.loginService.getAuth().subscribe(auth => {
            if (auth) {
               this.router.navigate([`/`]).then(r => console.log(r));
            }
        });
    }

    public login(): void {
        this.loginService.login(this.email, this.password)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido '+res.user?.displayName,
                    text: 'Inicio de sesión correcto',
                }).then(()=>this.router.navigate([`/`]).then(r => console.log(r)))

            }).catch( error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos'+error,
                }).then();
            });
    }
}
