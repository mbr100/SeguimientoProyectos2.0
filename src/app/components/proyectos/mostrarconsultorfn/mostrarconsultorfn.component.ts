import {Component, Input, OnInit} from '@angular/core';
import {Consultores} from "../../../models/consultores.model";
import {ConsultoresService} from "../../../services/consultores.service";

@Component({
  selector: 'app-mostrarconsultorfn',
  standalone: true,
  imports: [],
  templateUrl: './mostrarconsultorfn.component.html',
  styleUrl: './mostrarconsultorfn.component.css'
})
export class MostrarconsultorfnComponent implements OnInit{
    @Input() idConsultor?: string;
    public consultor!: Consultores;
    constructor(private consultorService: ConsultoresService) {
        this.consultor = new Consultores();
    }

    ngOnInit() {
        this.consultorService.getConsultor(this.idConsultor!).subscribe(value => {
            this.consultor = value;
        });
    }

}
