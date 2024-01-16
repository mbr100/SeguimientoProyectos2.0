import {Component, signal, WritableSignal} from '@angular/core';
import {Comite} from "../../../../models/comite.model";
import {ComitesService} from "../../../../services/comites.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-comites',
  standalone: true,
  imports: [],
  templateUrl: './listar-comites.component.html',
  styles: ``
})
export class ListarComitesComponent {
    public comites!: Comite[];
    public comitesFiltrados!: Comite[];
    public busqueda: boolean;
    public numerosComites: WritableSignal<number> = signal<number>(0);

    public constructor(private ComiteService: ComitesService, private router: Router) {
        this.busqueda = false;
        this.ComiteService.listarComites().subscribe((resp: Comite[]) => {
            this.comites = resp;
            this.numerosComites.set(resp.length);
        });
    }

    public buscar(value: string): void {
        this.comitesFiltrados = this.comites.filter((comite: Comite) => {
            return comite.nombre.toLowerCase().includes(value.toLowerCase());
        });
    }

    public editarComite(comite: Comite): void {
        this.router.navigateByUrl(`mantenimientos/comites/editarComites/${comite.id}`).then();

    }

    public eliminarComite(comite: Comite) {
        this.ComiteService.eliminarComite(comite).then( _ => {
            this.ComiteService.listarComites().subscribe((resp: Comite[]) => {
                this.comites = resp;
                this.numerosComites.set(resp.length);
            });
        });
    }

    public agregarComite(): void {
        this.router.navigateByUrl('mantenimientos/comites/agregarComites').then();
    }
}
