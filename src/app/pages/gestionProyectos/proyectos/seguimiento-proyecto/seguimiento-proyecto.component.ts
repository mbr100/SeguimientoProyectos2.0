import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Proyecto} from "../../../../models/proyecto.model";
import {ProyectoService} from "../../../../services/proyecto.service";
import {Consultores} from "../../../../models/consultores.model";
import {ConsultoresService} from "../../../../services/consultores.service";
import {ExpertoTecnicoService} from "../../../../services/experto-tecnico.service";
import {ExpertoComiteService} from "../../../../services/experto-comite.service";
import {ComitesService} from "../../../../services/comites.service";
import {ExpertoTecnico} from "../../../../models/expertoTecnico.model";
import {Comite} from "../../../../models/comite.model";
import {ExpertoComite} from "../../../../models/experto-comite.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
    selector: 'app-seguimiento-proyecto',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './seguimiento-proyecto.component.html',
    styles: ``
})
export class SeguimientoProyectoComponent implements OnInit {
    public idProyecto: string;
    public proyecto!: Proyecto;
    public consultorProyecto!: Consultores;
    public expertoProyecto!: ExpertoTecnico;
    public experto2Proyecto!: ExpertoTecnico;
    public expertoComite!: ExpertoComite;
    public expertoComite2!: ExpertoComite;
    public comiteProyecto!: Comite;
    public elegirET: ExpertoTecnico[] = [];
    public coordinadoresComite: Comite[] = [];
    public expertos4D: ExpertoComite[] = [];

    public codigoproyecto = signal<string | null>(null);

    constructor(private route: ActivatedRoute, private proyectoService: ProyectoService, private consultorService: ConsultoresService, private expertoService: ExpertoTecnicoService,
                private expertocomiteService: ExpertoComiteService, private comiteService: ComitesService, private router: Router) {
        this.idProyecto = this.route.snapshot.paramMap.get('id') || '';
        this.proyecto = new Proyecto();
        this.consultorProyecto = new Consultores();
        this.expertoProyecto = new ExpertoTecnico();
        this.experto2Proyecto = new ExpertoTecnico();
        this.comiteProyecto = new Comite();
        this.expertoComite = new ExpertoComite();
        this.expertoComite2 = new ExpertoComite();
    }

    ngOnInit() {
        this.proyectoService.getProyecto(this.idProyecto).subscribe({
            next: value => {
                this.proyecto = value;
                if (value.codigo != null) {
                    this.codigoproyecto.set(value.codigo);
                }
                if (value.consultor != null) {
                    if (value.consultor != "") {
                        this.consultorService.getConsultor(value.consultor).subscribe(value => {
                            this.consultorProyecto = value;
                        });
                    }
                }
                if (value.expertoTecnico != null) {
                    if (value.expertoTecnico != "") {
                        this.expertoService.getExpertoTecnico(value.expertoTecnico).subscribe(value => {
                            this.expertoProyecto = value;
                        });
                    }
                }
                if (value.experto2Tecnico != null) {
                    if (value.experto2Tecnico != "") {
                        this.expertoService.getExpertoTecnico(value.experto2Tecnico).subscribe(value => {
                            this.experto2Proyecto = value;
                        });
                    }
                }
                if (value.coordinadorComite != null) {
                    if (value.coordinadorComite != "") {
                        this.comiteService.obtenerComite(value.coordinadorComite).subscribe(value => {
                            this.comiteProyecto = value;
                        });
                    }
                }
                if (value.experto4D != null) {
                    if (value.experto4D != "") {
                        this.expertocomiteService.getExpertoComite(value.experto4D).subscribe(value => {
                            this.expertoComite = value;
                        });
                    }
                }
                if (value.experto4D2 != null) {
                    if (value.experto4D2 != "") {
                        this.expertocomiteService.getExpertoComite(value.experto4D2).subscribe(value => {
                            this.expertoComite2 = value;
                        });
                    }
                }
            },
            error: err => console.log(err)
        });
        this.expertoService.getExpertosTecnicos().subscribe({
            next: value => {
                this.elegirET = value;
            },
            error: err => console.log(err),
            complete: () => console.log('done')
        });
        this.comiteService.listarComites().subscribe({
            next: value => {
                this.coordinadoresComite = value;
            },
            error: err => console.log(err),
        });
        this.expertocomiteService.getExpertosComite().subscribe({
            next: value => {
                this.expertos4D = value;
            },
            error: err => console.log(err),
        });
    }

    public archivarProyecto(): void {
        this.proyectoService.archivarProyecto(this.proyecto).then(() => {
            this.router.navigateByUrl('proyectos').then();
        });
    }

    public actualizarproyecto() {
        this.proyecto.id = this.idProyecto;
        this.proyectoService.actualizarProyecto(this.proyecto).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Proyecto actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                this.router.navigateByUrl('proyectos/seguimientoProyecto/' + this.proyecto.id).then();
            });
        });
    }

    public volver(): void {
        this.router.navigate(['/proyectos/listadoProyectos']).then();
    }

    public inicioComite(): void {
        this.proyecto.fechaComite = new Date();
        this.actualizarproyecto();
    }

    public finDeComite(): void {
        this.proyecto.fechaFinComite = new Date();
        this.actualizarproyecto();
    }

    public enviarEmailAperturaExpertoTecnico(): void {
        const subject = 'Proyecto ' + this.proyecto.codigo + ': ' + this.proyecto.titulo;
        const body = 'Buenos días, ' + this.expertoProyecto.nombre + ' ' + this.expertoProyecto.apellido1 + ' ' + this.expertoProyecto.apellido2 + '\n\n' +
            'Mi nombre es Mario Borrego de EQA y seré el gestor del proyecto ' + this.proyecto.codigo + ' de la empresa ' + this.proyecto.cliente + '. ' +
            'Te acabo de asignar en plataforma por lo que ya puedes realizar la evaluación. Puedes visualizar sobre la misma la NC que he abierto. ' +
            'A lo largo de la mañana de mañana si tienes disponibilidad la llamo y comentamos el proyecto. \n\n' +
            'Quedo a la espera por si necesitas abrir NC \n\n' +
            'Un saludo, Mario Borrego';
        window.location.href = 'mailto:' + this.expertoProyecto.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }

    public enviarEmailCierreExpertoTecnico(): void {
        const subject = 'Proyecto ' + this.proyecto.codigo + ': ' + this.proyecto.titulo+' - Certificado';
        const body = 'Buenos días, ' + this.expertoProyecto.nombre + ' ' + this.expertoProyecto.apellido1 + ' ' + this.expertoProyecto.apellido2 + '\n\n' +
            'Queria informarle que el proyecto ya ha sido certificado. Aprovecho para agradecerle su colaboración en el mismo. ' +
            'Ha sido un placer trabajar con usted y agradecerle su dedicacion, espero colaborar con usted en el futuro.\n\n' +
            'Un saludo, Mario Borrego';
        window.location.href = 'mailto:' + this.expertoProyecto.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }


    public enviarEmailAperturaComite(): void {
        const subject = 'Comité  ' + this.proyecto.codigo;
        const body ='Buenos días, ' + this.expertoComite.nombre+ '\n\n' +
            'Mi nombre es Mario Borrego de EQA y seré el gestor del proyecto'+this.proyecto.codigo+' de la empresa' +this.proyecto.cliente+'. ' +
            'Le adjunto la documentación necesaria para su evaluación.\n\n' +
            'Si le surge alguna duda no dude en contactarme, quedo a su disposición.\n\n'+
            'Un saludo, Mario Borrego';
        console.log(this.expertoComite)
        window.location.href = 'mailto:' + this.expertoComite.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    }

    public enviarEmailCycComite(): void {
        const body ='Buenos días '+this.expertoComite.nombre+' '+this.expertoComite.apellido1+' '+this.expertoComite.apellido2+',\n\n' +
            'Mi nombre es Mario Borrego de EQA y seré el gestor del proyecto'+this.proyecto.codigo+'de la empresa '+this.proyecto.cliente+'. Le adjunto la CYC 4D para que me devuelva cumplimentada previo al envío de la' +
            'documentación necesaria para la evaluación de comité. Si le surge alguna duda no dude en contactarme, quedo a su disposición.\n\n' +
            'Un saludo, Mario Borrego.';
        console.log(this.expertoComite)
        window.location.href = 'mailto:' + this.expertoComite.email + '?subject=' + encodeURIComponent('CYC proyecto ' + this.proyecto.codigo) + '&body=' + encodeURIComponent(body);
    }

    public enviarEmailCertificadoCliente(): void {
        const subject = 'Certificado ' + this.proyecto.codigo;
        const body = 'Estimado cliente, ' + this.consultorProyecto.nombre + '\n\n' +
            'Una vez tomada la decisión de Certificación, remito adjunto ITC y Certificado de su expediente '+ this.proyecto.codigo+' de '+ this.proyecto.cliente+'.\n\n' +
            'Le recuerdo que dispone de un plazo de 48h si desea apelar, y si así fuera, un plazo de 15 días naturales para responder a la misma.\n\n' +
            'Por favor, esperamos confirmación al respecto.\n\n' +
            'Un saludo, Mario Borrego';
        window.location.href = 'mailto:' + this.consultorProyecto.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
}
