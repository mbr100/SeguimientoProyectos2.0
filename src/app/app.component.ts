import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {CabeceroComponent} from "@components/cabecero/cabecero.component";
import {FooterComponent} from "@components/footer/footer.component";
import {AvisoService} from "@services/aviso.service";
import {Aviso} from "@models/aviso.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, CabeceroComponent, FooterComponent],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public title: string = 'SeguimientoProyectos2';
    public avisos: Aviso[]

    constructor(private avisosService:AvisoService) {
        this.avisos = new Array<Aviso>();
    }

    ngOnInit() {
        this.avisosService.listarAvisos().subscribe({
            next: avisos => {
                this.avisos = avisos;
                console.log(this.avisos.length);
                if (this.avisos.length > 0) {
                    Swal.fire({
                        title: 'Avisos',
                        html: this.avisos.map(aviso => aviso.mensaje).join('<br>'),
                        icon: 'info',
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true,
                    }).then(r => {
                        if (r.isConfirmed) {
                            console.log('Aceptado');
                            this.avisos.forEach(aviso => {
                                this.avisosService.eliminarAvisos(aviso).then(() => {
                                    console.log('Aviso '+ aviso.codigo +' eliminado');
                                });
                            });
                        }
                    });
                }
            },
            error: error => {
                console.error(error);
            }
        });
    }
}
