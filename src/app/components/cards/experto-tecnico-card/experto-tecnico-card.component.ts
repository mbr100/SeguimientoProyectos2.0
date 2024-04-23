import {Component, Input} from '@angular/core';
import {ExpertoTecnico} from "@models/expertoTecnico.model";

@Component({
  selector: 'app-experto-tecnico-card',
  standalone: true,
  imports: [],
  templateUrl: './experto-tecnico-card.component.html',
  styles: ``
})
export class ExpertoTecnicoCardComponent {
    @Input() expertoTecnico!: ExpertoTecnico;
}
