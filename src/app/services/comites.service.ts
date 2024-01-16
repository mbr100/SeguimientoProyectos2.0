import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Comite} from "../models/comite.model";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ComitesService {
    private comitesCollection: AngularFirestoreCollection<Comite>;
    private comiteDoc!: AngularFirestoreDocument<Comite>;
    private comites!: Observable<Comite[]>;
    constructor(private db: AngularFirestore ) {
        this.comitesCollection = this.db.collection<Comite>('comites');
    }

    public agregarComite(comite: Comite): Promise<any>{
        return this.comitesCollection.add(comite);
    }

    public eliminarComite(comite: Comite): Promise<any> {
        return this.comitesCollection.doc(comite.id).delete();
    }

    public listarComites(): Observable<Comite[]> {
        this.comites = this.comitesCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Comite;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        );
        return this.comites;
    }

    public obtenerComite(id: string): Observable<Comite> {
        this.comiteDoc = this.comitesCollection.doc<Comite>(id);
        return this.comiteDoc.snapshotChanges().pipe(
            map(accion => {
                const data = accion.payload.data() as Comite;
                data.id = accion.payload.id;
                return data;
            })
        );
    }

    public editarComite(comite: Comite): Promise<any> {
        return this.comitesCollection.doc(comite.id).update(comite);
    }

}
