import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {TipoRecurso} from "../models/tipoRecurso.model";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TipoRecusoService {
    private tipoRecursosCollection: AngularFirestoreCollection<TipoRecurso>;
    private tipoRecursos!: Observable<TipoRecurso[]>;

    constructor(private db: AngularFirestore) {
        this.tipoRecursosCollection = this.db.collection<TipoRecurso>('tipoRecursos');
    }

    public agregarTipoRecurso(tipoRecurso: TipoRecurso): Promise<any> {
        return this.tipoRecursosCollection.add(tipoRecurso);
    }

    public listarTipoRecursos(): Observable<TipoRecurso[]> {
        return this.tipoRecursosCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as TipoRecurso;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        );
    }

    public getTipoRecurso(id: string): Observable<TipoRecurso[]> {
         return this.tipoRecursosCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as TipoRecurso;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        );
    }

    public eliminarTipoRecurso(idTipoRecurso: string): Promise<any> {
        return this.tipoRecursosCollection.doc(idTipoRecurso).delete();
    }
}
