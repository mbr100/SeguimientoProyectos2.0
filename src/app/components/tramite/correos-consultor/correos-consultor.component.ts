import { Component, Input } from '@angular/core';
import {Tramites} from "@models/tramites.model";
import {Consultores} from "@models/consultores.model";

@Component({
  selector: 'app-correos-consultor',
  standalone: true,
  imports: [],
  templateUrl: './correos-consultor.component.html',
  styles: ``
})
export class CorreosConsultorComponent {
    @Input() public tramite!: Tramites;
    @Input() public consultorProyecto!: Consultores;
    public enviarNotificacionCliente(): void {
        const subject = 'TA ' + this.tramite.codigo;
        const body = 'Buenos dias, ' + this.consultorProyecto.nombre + '\n\n' +
            'Tal y como hemos hablado por teléfono, hemos recibido un TA del ministerio por el proyecto' + this.tramite.codigo +' de la empresa' +this.tramite.cliente +
            '. En este email le mando el mismo y le informo que hemos activado el procedimiento para contestar al mismo, también aprovecho para comentarle ' +
            'ue es posible que el ET pida mayor información para cumplimentar su escrito por lo que es posible que me ponga en contacto con usted para ello. \n'+
            'Un saludo, Mario Borrego';
        window.location.href = 'mailto:' + this.consultorProyecto.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
}
