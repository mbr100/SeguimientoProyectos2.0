import {Component, Input} from '@angular/core';
import {ExpertoTecnico} from "@models/expertoTecnico.model";
import {Tramites} from "@models/tramites.model";

@Component({
    selector: 'app-correos-et',
    standalone: true,
    imports: [],
    templateUrl: './correos-et.component.html',
    styles: ``
})
export class CorreosETComponent {
    @Input() expertoTecnico!: ExpertoTecnico;
    @Input() tramite!: Tramites;

    public enviarNotificacionexpertoTecnica(): void {
        const subject = 'TA ' + this.tramite.codigo;
        const body = 'Buenos dias, ' + this.expertoTecnico.nombre + '\n\n' +
            'Acabamos de recibir un trámite de audiencia del ministerio por el proyecto ' + this.tramite.codigo + ' de la empresa ' + this.tramite.cliente +
            ' que certificamos el año pasado. Tras la recepción de este hemos puesto en marcha el procedimiento para su defensa.\n'
            + 'Es por ello por lo que, en el presente email, te facilito la siguiente información:\n' +
            '•\tEl informe técnico conclusivo\n' +
            '•\tEl requerimiento del ministerio.\n' +
            '•\tLa plantilla del escrito que debes de cumplimentar para la defensa del requerimiento.\n' +
            '\n' +
            'Como ya sabes, esta tipología de requerimientos tiene un plazo de respuesta muy limitado por lo que te agradecería tener en los próximos 10 días ' +
            'el escrito para su contestación. También solicitarte que si necesitaras más información me lo indicaras en la mayor brevedad posible para podérselo ' +
            'solicitar la empresa.'
            + 'Un saludo, Mario Borrego';
        window.location.href = 'mailto:' + this.expertoTecnico.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
}
