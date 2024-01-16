import {Component, Input, OnInit} from '@angular/core';
import {ExpertoTecnicoService} from "../../services/experto-tecnico.service";
import {ExpertoTecnico} from "../../models/expertoTecnico.model";

@Component({
  selector: 'app-mostrarexperto',
  standalone: true,
  imports: [],
  templateUrl: './mostrarexperto.component.html',
  styleUrl: './mostrarexperto.component.css'
})
export class MostrarexpertoComponent implements OnInit{
    @Input() idExperto?: string;
    public experto!: ExpertoTecnico;
    constructor(private expertoService: ExpertoTecnicoService) {}

    public ngOnInit(): void {
        this.expertoService.getExpertoTecnico(this.idExperto!).subscribe(value => {
            this.experto = value;
        });
    }
}
