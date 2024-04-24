import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {CabeceroComponent} from "@components/cabecero/cabecero.component";
import {FooterComponent} from "@components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, CabeceroComponent, FooterComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {
    public title: string = 'SeguimientoProyectos2';
}
