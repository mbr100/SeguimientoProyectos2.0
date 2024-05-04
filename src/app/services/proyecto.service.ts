import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from "@angular/fire/compat/firestore";
import {Proyecto} from "@models/proyecto.model";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProyectoService {
    private proyectosCollection: AngularFirestoreCollection<Proyecto>;
    private proyectosBuckUp: AngularFirestoreCollection<Proyecto>;
    private proyectosCertificadosCollection: AngularFirestoreCollection<Proyecto>;
    private proyectosArchivadosCollection: AngularFirestoreCollection<Proyecto>;
    private proyectos!: Observable<Proyecto[]>;
    private proyectoDoc!: AngularFirestoreDocument<Proyecto>;
    private proyectosCollectionEstadisticas!: AngularFirestoreCollection<Proyecto>;

    public constructor(private db: AngularFirestore) {
        this.proyectosCollection = this.db.collection<Proyecto>('proyectos', ref =>
            ref.where('estado', '==', 'ACTIVO').orderBy('codigo', 'asc'));
        this.proyectosCertificadosCollection = this.db.collection<Proyecto>('proyectos', ref =>
            ref.where('estado', '==', 'Certificado').orderBy('codigo', 'asc'));
        this.proyectosArchivadosCollection = this.db.collection<Proyecto>('proyectos', ref =>
            ref.where('estado', '==', 'Archivado').orderBy('codigo', 'asc'));
        this.proyectosBuckUp = this.db.collection<Proyecto>('proyectos');
    }

    public agregarProyecto(proyecto: Proyecto): Promise<DocumentReference<Proyecto>> {
        return this.proyectosCollection.add(proyecto);
    }

    public getProyectosPorAno(anoCertitificacion: number): Observable<Proyecto[]> {
        this.proyectosCollectionEstadisticas = this.db.collection<Proyecto>('proyectos', ref =>
            ref.where('estado', '==', 'Certificado')
                .where('anoCertificacion', '==', anoCertitificacion)
                .orderBy('codigo', 'asc'));
        return this.proyectosCollectionEstadisticas.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Proyecto;
                    const fechaini = datos.payload.doc.data().fechaInicioProyecto as any;
                    const fechaf = datos.payload.doc.data().fechaFinProyecto as any;
                    const fechac = datos.payload.doc.data().fechaComite as any;
                    const fechafcomite = datos.payload.doc.data().fechaFinComite as any;
                    data.fechaInicioProyecto = fechaini.toDate();
                    if (fechaf != null) {
                        data.fechaFinProyecto = fechaf.toDate();
                    }
                    if (fechac != null) {
                        data.fechaComite = fechac.toDate();
                    }
                    if (fechafcomite != null) {
                        data.fechaFinComite = fechafcomite.toDate();
                    }
                    data.id = datos.payload.doc.id;
                    return data;
                });
            }));
    }

    public getProyectos(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Proyecto;
                    const fechaini = datos.payload.doc.data().fechaInicioProyecto as any;
                    const fechaf = datos.payload.doc.data().fechaFinProyecto as any;
                    const fechac = datos.payload.doc.data().fechaComite as any;
                    const fechafcomite = datos.payload.doc.data().fechaFinComite as any;
                    data.fechaInicioProyecto = fechaini.toDate();
                    if (fechaf != null) {
                        data.fechaFinProyecto = fechaf.toDate();
                    }
                    if (fechac != null) {
                        data.fechaComite = fechac.toDate();
                    }
                    if (fechafcomite != null) {
                        data.fechaFinComite = fechafcomite.toDate();
                    }
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        )
        return this.proyectos;
    }

    public getProyectosBuckup(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosBuckUp.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Proyecto;
                    const fechaini = datos.payload.doc.data().fechaInicioProyecto as any;
                    const fechaf = datos.payload.doc.data().fechaFinProyecto as any;
                    const fechac = datos.payload.doc.data().fechaComite as any;
                    const fechafcomite = datos.payload.doc.data().fechaFinComite as any;
                    data.fechaInicioProyecto = fechaini.toDate();
                    if (fechaf != null) {
                        data.fechaFinProyecto = fechaf.toDate();
                    }
                    if (fechac != null) {
                        data.fechaComite = fechac.toDate();
                    }
                    if (fechafcomite != null) {
                        data.fechaFinComite = fechafcomite.toDate();
                    }
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        )
        return this.proyectos;
    }

    public getProyecto(id: string): Observable<Proyecto> {
        this.proyectoDoc = this.proyectosCollection.doc<Proyecto>(id);
        return this.proyectoDoc.snapshotChanges().pipe(
            map(accion => {
                const proyecto = accion.payload.data() as Proyecto;
                const fechaini = accion.payload.data()!.fechaInicioProyecto as any;
                const fechaf = accion.payload.data()!.fechaFinProyecto as any;
                const fechac = accion.payload.data()!.fechaComite as any;
                const fechafcomite = accion.payload.data()!.fechaFinComite as any;
                proyecto.fechaInicioProyecto = fechaini.toDate();
                if (fechaf != null) {
                    proyecto.fechaFinProyecto = fechaf.toDate();
                } else {
                    proyecto.fechaFinProyecto = null;
                }
                if (fechac != null) {
                    proyecto.fechaComite = fechac.toDate();
                } else {
                    proyecto.fechaComite = null;
                }
                if (fechafcomite != null) {
                    proyecto.fechaFinComite = fechafcomite.toDate();
                } else {
                    proyecto.fechaFinComite = null;
                }
                proyecto.id = accion.payload.data()!.id;
                return proyecto;
            })
        )
    }

    public actualizarProyecto(proyecto: Proyecto): Promise<void> {
        if (proyecto.fechaFinProyecto == undefined) {
            proyecto.fechaFinProyecto = null;
        }
        const {id, ...proyectoSinId} = proyecto;
        return this.proyectosCollection.doc(proyecto.id).update(proyectoSinId);
    }

    public archivarProyecto(proyecto: Proyecto): Promise<void> {
        proyecto.estado = "Archivado";
        const {id, ...proyectoSinId} = proyecto;
        return this.proyectosCollection.doc(proyecto.id).update(proyectoSinId);
    }

    public certificarProyecto(proyecto: Proyecto): Promise<void> {
        proyecto.estado = "Certificado";
        const {id, ...proyectoSinId} = proyecto;
        return this.proyectosCollection.doc(proyecto.id).update(proyectoSinId);
    }

    public getProyectosCertificados(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosCertificadosCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Proyecto;
                    const fechaini = datos.payload.doc.data().fechaInicioProyecto as any;
                    const fechaf = datos.payload.doc.data().fechaFinProyecto as any;
                    const fechac = datos.payload.doc.data().fechaComite as any;
                    const fechafcomite = datos.payload.doc.data().fechaFinComite as any;
                    data.fechaInicioProyecto = fechaini.toDate();
                    if (fechaf != null) {
                        data.fechaFinProyecto = fechaf.toDate();
                    }
                    if (fechac != null) {
                        data.fechaComite = fechac.toDate();
                    }
                    if (fechafcomite != null) {
                        data.fechaFinComite = fechafcomite.toDate();
                    }
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        )
        return this.proyectos;
    }

    public getProyectosArchivados(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosArchivadosCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Proyecto;
                    const fechaini = datos.payload.doc.data().fechaInicioProyecto as any;
                    const fechaf = datos.payload.doc.data().fechaFinProyecto as any;
                    const fechac = datos.payload.doc.data().fechaComite as any;
                    const fechafcomite = datos.payload.doc.data().fechaFinComite as any;
                    data.fechaInicioProyecto = fechaini.toDate();
                    if (fechaf != null) {
                        data.fechaFinProyecto = fechaf.toDate();
                    }
                    if (fechac != null) {
                        data.fechaComite = fechac.toDate();
                    }
                    if (fechafcomite != null) {
                        data.fechaFinComite = fechafcomite.toDate();
                    }
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        )
        return this.proyectos;
    }
}
