import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Tramites} from "@models/tramites.model";

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
    private tramitesCollection: AngularFirestoreCollection<Tramites>;
    private tramiteDoc!: AngularFirestoreDocument<Tramites>;
    private tramites!: Observable<Tramites[]>

    constructor(private db: AngularFirestore) {
        this.tramitesCollection = this.db.collection<Tramites>('tramites', ref =>
            ref.where('estado', '==', 'ACTIVO'));
    }

    public agregarTramite(tramite: Tramites): Promise<any> {
        return this.tramitesCollection.add(tramite);
    }

    public obtenerTramites(): Observable<Tramites[]> {
        this.tramites = this.tramitesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Tramites;
                const fechaInicio = a.payload.doc.data().fechaInicioTramite as any;
                const fechaEntrega = a.payload.doc.data().fechaEntrega as any;
                if (fechaEntrega != null) {
                    data.fechaEntrega = fechaEntrega.toDate();
                }
                data.fechaInicioTramite = fechaInicio.toDate();
                const id = a.payload.doc.id;
                data.id = id;
                return data;
            }))
        );
        return this.tramites;
    }

    public obtenerTramite(id: string): Observable<Tramites> {
        this.tramiteDoc = this.tramitesCollection.doc<Tramites>(id)
        return this.tramiteDoc.snapshotChanges().pipe(
            map(a => {
                const data = a.payload.data() as Tramites;
                const fechaInicio = a.payload.data()!.fechaInicioTramite as any;
                const fechaEntrega = a.payload.data()!.fechaEntrega as any;
                if (fechaEntrega != null) {
                    data.fechaEntrega = fechaEntrega.toDate();
                }
                data.fechaInicioTramite = fechaInicio.toDate();
                const id = a.payload.id;
                data.id = id;
                return data;
            })
        );
    }


    public eliminarTramite(id: string): Promise<void> {
        return this.tramitesCollection.doc(id).delete();
    }

    public actualizarTramite(tramite: Tramites): Promise<void> {
        const {id, ...tramiteSinId} = tramite;
        return this.tramitesCollection.doc(id).update(tramiteSinId);
    }
}
