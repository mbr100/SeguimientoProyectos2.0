import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction, DocumentReference} from "@angular/fire/compat/firestore";
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
    //private proyectosCollectionEstadisticas!: AngularFirestoreCollection<Proyecto>;

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

    // public getProyectosPorAno(anoCertitificacion: number): Observable<Proyecto[]> {
    //     this.proyectosCollectionEstadisticas = this.db.collection<Proyecto>('proyectos', ref =>
    //         ref.where('estado', '==', 'Certificado')
    //             .where('anoCertificacion', '==', anoCertitificacion)
    //             .orderBy('codigo', 'asc'));
    //     return this.proyectosCollectionEstadisticas.snapshotChanges().pipe(
    //         map(accion => {
    //             return this.mapearProyectos(accion);
    //         }));
    // }

    private mapearProyectos(accion: DocumentChangeAction<Proyecto>[]): Proyecto[] {
        return accion.map((datos: DocumentChangeAction<Proyecto>) => {
            const data: Proyecto = datos.payload.doc.data() as Proyecto;
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
    }

    public getProyectos(): Observable<Proyecto[]> {
        return this.proyectosCollection.snapshotChanges().pipe(
            map((accion: DocumentChangeAction<Proyecto>[]) => {
                return this.mapearProyectos(accion);
            })
        )
    }

    public getProyectosBuckup(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosBuckUp.snapshotChanges().pipe(
            map((accion: DocumentChangeAction<Proyecto>[]) => {
                return this.mapearProyectos(accion);
            })
        )
        return this.proyectos;
    }

    public getProyecto(id: string): Observable<Proyecto> {
        this.proyectoDoc = this.proyectosCollection.doc<Proyecto>(id);
        return this.proyectoDoc.snapshotChanges().pipe(
            map(accion => {
                const proyecto = accion.payload.data() as Proyecto;
                const fechaini = proyecto.fechaInicioProyecto as any;
                const fechaf = proyecto.fechaFinProyecto as any;
                const fechac = proyecto.fechaComite as any;
                const fechafcomite = proyecto.fechaFinComite as any;

                proyecto.fechaInicioProyecto = fechaini.toDate();
                proyecto.fechaFinProyecto = fechaf ? fechaf.toDate() : null;
                proyecto.fechaComite = fechac ? fechac.toDate() : null;
                proyecto.fechaFinComite = fechafcomite ? fechafcomite.toDate() : null;
                proyecto.id = accion.payload.id;

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
        const {id: string, ...proyectoSinId} = proyecto;
        return this.proyectosCollection.doc(proyecto.id).update(proyectoSinId);
    }

    public certificarProyecto(proyecto: Proyecto): Promise<void> {
        proyecto.estado = "Certificado";
        const {id, ...proyectoSinId} = proyecto;
        return this.proyectosCollection.doc(proyecto.id).update(proyectoSinId);
    }

    public getProyectosCertificados(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosCertificadosCollection.snapshotChanges().pipe(
            map((accion: DocumentChangeAction<Proyecto>[]) => {
               return this.mapearProyectos(accion);
            })
        )
        return this.proyectos;
    }

    public getProyectosArchivados(): Observable<Proyecto[]> {
        this.proyectos = this.proyectosArchivadosCollection.snapshotChanges().pipe(
            map((accion: DocumentChangeAction<Proyecto>[]) => {
                return this.mapearProyectos(accion);
            })
        )
        return this.proyectos;
    }
}
