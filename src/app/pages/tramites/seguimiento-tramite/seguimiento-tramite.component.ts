import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TramiteService } from "@services/tramite.service";
import { Tramites } from "@models/tramites.model";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MostrarconsultorfnComponent } from "@components/proyectos/mostrarconsultorfn/mostrarconsultorfn.component";
import { Consultores } from "@models/consultores.model";
import { ConsultoresService } from "@services/consultores.service";
import { ExpertoTecnicoService } from "@services/experto-tecnico.service";
import { ExpertoTecnico } from "@models/expertoTecnico.model";
import { DatePipe } from "@angular/common";
import { ConsultorCardComponent } from "@components/cards/consultor-card/consultor-card.component";
import { ExpertoTecnicoCardComponent } from "@components/cards/experto-tecnico-card/experto-tecnico-card.component";

import Swal from "sweetalert2";
import {CorreosConsultorComponent} from "@components/tramite/correos-consultor/correos-consultor.component";
import {CorreosETComponent} from "@components/tramite/correos-et/correos-et.component";

@Component({
    selector: 'app-seguimiento-tramite',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MostrarconsultorfnComponent,
        DatePipe,
        ConsultorCardComponent,
        ExpertoTecnicoCardComponent,
        CorreosConsultorComponent,
        CorreosETComponent
    ],
    templateUrl: './seguimiento-tramite.component.html',
    styles: ``
})
export class SeguimientoTramiteComponent implements OnInit {
    public idTramite: string;
    public tramite: Tramites;
    public consultorProyecto: Consultores;
    public expertoTecnico: ExpertoTecnico;

    constructor(private route: ActivatedRoute, private TramiteService: TramiteService, private consultorService: ConsultoresService,
                private expertoTecnicoService: ExpertoTecnicoService, private router: Router) {
        this.idTramite = this.route.snapshot.paramMap.get('id') || '';
        this.tramite = new Tramites();
        this.consultorProyecto = new Consultores();
        this.expertoTecnico = new ExpertoTecnico();
    }

    public ngOnInit(): void {
        this.TramiteService.obtenerTramite(this.idTramite).subscribe({
            next: (tramite: Tramites) => {
                this.tramite = tramite
                if (this.tramite.consultor) {
                    this.consultorService.getConsultor(tramite.consultor!).subscribe({
                        next: (consultor: Consultores) => {
                            this.consultorProyecto = consultor
                        }
                    });
                }
                if (this.tramite.expertoTecnico) {
                    this.expertoTecnicoService.getExpertoTecnico(tramite.expertoTecnico!).subscribe({
                        next: (expertoTecnico: ExpertoTecnico) => {
                            this.expertoTecnico = expertoTecnico
                        }
                    });
                }
            },
            error: (error) => Swal.fire('Error', error.error.message, 'error'),
            complete: () => console.log('complete')
        });
    }

    public actualizarTramite(): void {
        this.TramiteService.actualizarTramite(this.tramite).then(() => {
            Swal.fire('Exito', 'Tramite actualizado correctamente', 'success').then();
        }).catch((error) => {
            Swal.fire('Error', error.error.message, 'error').then();
        });
    }

    public volver(): void {
        this.router.navigate(['/tramites']).then();
    }

    public entregar(): void {
        this.tramite.estado = 'Entregado';
        this.tramite.fechaEntrega = new Date();
        this.actualizarTramite();
    }
}
