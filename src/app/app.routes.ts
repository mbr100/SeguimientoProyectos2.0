import { Routes } from '@angular/router';
import {ListadoProyectosComponent} from "./pages/proyectos/listado-proyectos/listado-proyectos.component";
import {LoginComponent} from "./pages/authentication/login/login.component";
import {AgregarproyectoComponent} from "./pages/proyectos/agregarproyecto/agregarproyecto.component";
import {SeguimientoProyectoComponent} from "./pages/proyectos/seguimiento-proyecto/seguimiento-proyecto.component";
import {ListarProyectosCertificadosComponent} from "./pages/proyectosCertificados/listar-proyectos-certificados/listar-proyectos-certificados.component";
import {ListarProyectosArchivadosComponent} from "./pages/proyectosArchivados/listar-proyectos-archivados/listar-proyectos-archivados.component";
import {ListarETComponent} from "./pages/manteniminetos/expertoTecnico/listar-et/listar-et.component";
import {AgregarETComponent} from "./pages/manteniminetos/expertoTecnico/agregar-et/agregar-et.component";
import {EditarETComponent} from "./pages/manteniminetos/expertoTecnico/editar-et/editar-et.component";
import {ListarEComiteComponent} from "./pages/manteniminetos/expertoComite/listar-ecomite/listar-ecomite.component";
import {AgregarEComiteComponent} from "./pages/manteniminetos/expertoComite/agregar-ecomite/agregar-ecomite.component";
import {EditarEComiteComponent} from "./pages/manteniminetos/expertoComite/editar-ecomite/editar-ecomite.component";
import {ListadoConsultoresComponent} from "./pages/manteniminetos/consultores/listado-consultores/listado-consultores.component";
import {AgregarConsultorComponent} from "./pages/manteniminetos/consultores/agregar-consultor/agregar-consultor.component";
import {EditarConsultorComponent} from "./pages/manteniminetos/consultores/editar-consultor/editar-consultor.component";
import {ListarComitesComponent} from "./pages/manteniminetos/comistes/listar-comites/listar-comites.component";
import {AgregarComitesComponent} from "./pages/manteniminetos/comistes/agregar-comites/agregar-comites.component";
import {EditarComitesComponent} from "./pages/manteniminetos/comistes/editar-comites/editar-comites.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  //Proyectos
  { path: 'proyectos/listadoProyectos', component: ListadoProyectosComponent, canActivate: [authGuard]  },
  { path: 'proyectos/agregarProyecto', component: AgregarproyectoComponent, canActivate: [authGuard]  },
  { path: 'proyectos/seguimientoProyecto/:id', component: SeguimientoProyectoComponent, canActivate: [authGuard] },

  //Historico
  { path: 'historicos', component: ListarProyectosCertificadosComponent, canActivate: [authGuard]  },
  { path: 'archivados', component: ListarProyectosArchivadosComponent, canActivate: [authGuard]  },
  //Manenimientos
  //Expertos Técnicos
  { path: 'mantenimientos/expertos-tecnicos/listarET', component: ListarETComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/expertos-tecnicos/anadirET', component: AgregarETComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/expertos-tecnicos/editarET/:id', component: EditarETComponent, canActivate: [authGuard]  },
  //Expertos Comité
  { path: 'mantenimientos/expertos-comite/listarEcomite', component: ListarEComiteComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/expertos-comite/anadirEcomite', component: AgregarEComiteComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/expertos-comite/editarEcomite/:id', component: EditarEComiteComponent, canActivate: [authGuard]  },
  //Consultores
  { path: 'mantenimientos/consultores/listadoConsultores', component: ListadoConsultoresComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/consultores/agregarConsultor', component: AgregarConsultorComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/consultores/editarConsultor/:id', component: EditarConsultorComponent, canActivate: [authGuard]  },
  //Comités
  { path: 'mantenimientos/comites/listarComites', component: ListarComitesComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/comites/agregarComites', component: AgregarComitesComponent, canActivate: [authGuard]  },
  { path: 'mantenimientos/comites/editarComites/:id', component: EditarComitesComponent, canActivate: [authGuard]  },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'proyectos/listadoProyectos', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

