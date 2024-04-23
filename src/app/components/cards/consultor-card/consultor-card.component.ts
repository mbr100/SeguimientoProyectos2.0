import {Component, Input} from '@angular/core';
import {Consultores} from "@models/consultores.model";

@Component({
  selector: 'app-consultor-card',
  standalone: true,
  imports: [],
  templateUrl: './consultor-card.component.html',
  styles: ``
})
export class ConsultorCardComponent {
    @Input() consultor!: Consultores;
}
