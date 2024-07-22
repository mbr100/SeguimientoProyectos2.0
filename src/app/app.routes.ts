import {Routes} from '@angular/router';
import {ListadoProyectosComponent} from "@pages/gestionProyectos/proyectos/listado-proyectos/listado-proyectos.component";
import {LoginComponent} from "@pages/authentication/login/login.component";
import {AgregarproyectoComponent} from "@pages/gestionProyectos/proyectos/agregarproyecto/agregarproyecto.component";
import {SeguimientoProyectoComponent} from "@pages/gestionProyectos/proyectos/seguimiento-proyecto/seguimiento-proyecto.component";
import {ListarProyectosCertificadosComponent} from "@pages/gestionProyectos/proyectosCertificados/listar-proyectos-certificados/listar-proyectos-certificados.component";
import {ListarProyectosArchivadosComponent} from "@pages/gestionProyectos/proyectosArchivados/listar-proyectos-archivados/listar-proyectos-archivados.component";
import {authGuard} from "@guards/auth.guard";
import {AgregarTipoRecursoComponent} from "@pages/mantenimientos/tipoRecurso/agregar-tipo-recurso/agregar-tipo-recurso.component";
import {ListarTipoRecursoComponent} from "@pages/mantenimientos/tipoRecurso/listar-tipo-recurso/listar-tipo-recurso.component";
import {ListarETComponent} from "@pages/mantenimientos/expertoTecnico/listar-et/listar-et.component";
import {AgregarETComponent} from "@pages/mantenimientos/expertoTecnico/agregar-et/agregar-et.component";
import {EditarETComponent} from "@pages/mantenimientos/expertoTecnico/editar-et/editar-et.component";
import {ListarEComiteComponent} from "@pages/mantenimientos/expertoComite/listar-ecomite/listar-ecomite.component";
import {AgregarEComiteComponent} from "@pages/mantenimientos/expertoComite/agregar-ecomite/agregar-ecomite.component";
import {EditarEComiteComponent} from "@pages/mantenimientos/expertoComite/editar-ecomite/editar-ecomite.component";
import {ListadoConsultoresComponent} from "@pages/mantenimientos/consultores/listado-consultores/listado-consultores.component";
import {AgregarConsultorComponent} from "@pages/mantenimientos/consultores/agregar-consultor/agregar-consultor.component";
import {EditarConsultorComponent} from "@pages/mantenimientos/consultores/editar-consultor/editar-consultor.component";
import {ListarComitesComponent} from "@pages/mantenimientos/comistes/listar-comites/listar-comites.component";
import {AgregarComitesComponent} from "@pages/mantenimientos/comistes/agregar-comites/agregar-comites.component";
import {EditarComitesComponent} from "@pages/mantenimientos/comistes/editar-comites/editar-comites.component";
import {ListarRecursosComponent} from "@pages/recursos/listar-recursos/listar-recursos.component";
import {AgregarRecursosComponent} from "@pages/recursos/agregar-recursos/agregar-recursos.component";
import {UserComponent} from "@pages/user/user.component";
import {EditarRecursosComponent} from "@pages/recursos/editar-recursos/editar-recursos.component";
import {ListarTramitesComponent} from "@pages/tramites/listar-tramites/listar-tramites.component";
import {MostrarEstadisticasComponent} from "@pages/estadisticas/mostrar-estadisticas/mostrar-estadisticas.component";
import {SeguimientoTramiteComponent} from "@pages/tramites/seguimiento-tramite/seguimiento-tramite.component";
import {AgregarTramitesComponent} from "@pages/tramites/agregar-tramites/agregar-tramites.component";
import {ListarTramitesHistoricoComponent} from "@pages/tramites/listar-tramites-historico/listar-tramites-historico.component";

// export const routes: Routes = [
//     //Login
//     {path: 'login', component: LoginComponent},
//     //Proyectos
//     {path: 'proyectos/listadoProyectos', component: ListadoProyectosComponent, canActivate: [authGuard]},
//     {path: 'proyectos/agregarProyecto', component: AgregarproyectoComponent, canActivate: [authGuard]},
//     {path: 'proyectos/seguimientoProyecto/:id', component: SeguimientoProyectoComponent, canActivate: [authGuard]},
//     //Historico
//     {path: 'historicos', component: ListarProyectosCertificadosComponent, canActivate: [authGuard]},
//     {path: 'archivados', component: ListarProyectosArchivadosComponent, canActivate: [authGuard]},
//     //Manenimientos
//     //Expertos Técnicos
//     {path: 'mantenimientos/expertos-tecnicos', component: ListarETComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/expertos-tecnicos/listarET', component: ListarETComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/expertos-tecnicos/anadirET', component: AgregarETComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/expertos-tecnicos/editarET/:id', component: EditarETComponent, canActivate: [authGuard]},
//     //Expertos Comité
//     {path: 'mantenimientos/expertos-comite/listarEcomite', component: ListarEComiteComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/expertos-comite/anadirEcomite', component: AgregarEComiteComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/expertos-comite/editarEcomite/:id', component: EditarEComiteComponent, canActivate: [authGuard]},
//     //Consultores
//     {path: 'mantenimientos/consultores/listadoConsultores', component: ListadoConsultoresComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/consultores/agregarConsultor', component: AgregarConsultorComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/consultores/editarConsultor/:id', component: EditarConsultorComponent, canActivate: [authGuard]},
//     //Comités
//     {path: 'mantenimientos/comites/listarComites', component: ListarComitesComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/comites/agregarComites', component: AgregarComitesComponent, canActivate: [authGuard]},
//     {path: 'mantenimientos/comites/editarComites/:id', component: EditarComitesComponent, canActivate: [authGuard]},
//     //Tipo Recurso
//     {path: 'mantenimientos/tipo-recurso/listarTipoRecurso', component: ListarTipoRecursoComponent},
//     {path: 'mantenimientos/tipo-recurso/agregarTipoRecurso', component: AgregarTipoRecursoComponent, canActivate: [authGuard]},
//     {path: '', redirectTo: 'proyectos/listadoProyectos', pathMatch: 'full'},
//     {path: '**', redirectTo: ''}
// ];

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    // Proyectos
    {path: 'proyectos', canActivate: [authGuard], children: [
            {path: 'listadoProyectos', component: ListadoProyectosComponent},
            {path: 'agregarProyecto', component: AgregarproyectoComponent},
            {path: 'seguimientoProyecto/:id', component: SeguimientoProyectoComponent}]
    },
    // Historico
    {path: 'historicos', canActivate: [authGuard], component: ListarProyectosCertificadosComponent},
    {path: 'archivados', canActivate: [authGuard], component: ListarProyectosArchivadosComponent},
    {path: 'estadisticas', canActivate: [authGuard], component: MostrarEstadisticasComponent},
    {
        path: `tramites`, canActivate: [authGuard], children: [
            {path: '', component: ListarTramitesComponent},
            {path: 'agregar-tramites', component: AgregarTramitesComponent},
            {path: 'seguimiento/:id', component: SeguimientoTramiteComponent},
            {path: 'historico', component: ListarTramitesHistoricoComponent},
        ]
    },
    // Mantenimientos
    {path: 'mantenimientos', canActivate: [authGuard], children: [
            // Expertos Técnicos
            {
                path: 'expertos-tecnicos', children: [
                    {path: '', component: ListarETComponent},
                    {path: 'listarET', component: ListarETComponent},
                    {path: 'anadirET', component: AgregarETComponent},
                    {path: 'editarET/:id', component: EditarETComponent}]
            },
            // Expertos Comité
            {
                path: 'expertos-comite', children: [
                    {path: 'listarEcomite', component: ListarEComiteComponent},
                    {path: 'anadirEcomite', component: AgregarEComiteComponent},
                    {path: 'editarEcomite/:id', component: EditarEComiteComponent}]
            },
            // Consultores
            {
                path: 'consultores', children: [
                    {path: 'listadoConsultores', component: ListadoConsultoresComponent},
                    {path: 'agregarConsultor', component: AgregarConsultorComponent},
                    {path: 'editarConsultor/:id', component: EditarConsultorComponent}]
            },
            // Comités
            {
                path: 'comites', children: [
                    {path: 'listarComites', component: ListarComitesComponent},
                    {path: 'agregarComites', component: AgregarComitesComponent},
                    {path: 'editarComites/:id', component: EditarComitesComponent}]
            },
            // Tipo Recurso
            {
                path: 'tipoRecurso', children: [
                    {path: 'listarTipoRecurso', component: ListarTipoRecursoComponent},
                    {path: 'agregarTipoRecurso', component: AgregarTipoRecursoComponent}
                ]
            }]
    },
    {path: 'recursos', canActivate: [authGuard], children: [
            {path: 'listarRecursos', component: ListarRecursosComponent, canActivate: [authGuard]},
            {path: 'agregarRecurso', component: AgregarRecursosComponent, canActivate: [authGuard]},
            {path: 'editarRecurso/:id', component: EditarRecursosComponent, canActivate: [authGuard]}
        ]
    },
    {path: 'user', component: UserComponent, canActivate: [authGuard]},
    // Default and fallback routes
    {path: '', component: ListadoProyectosComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: ''}
];

