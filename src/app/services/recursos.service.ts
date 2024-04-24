import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Recurso} from "@models/recurso.model";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecursosService {
    private recursosCollection: AngularFirestoreCollection<Recurso>;
    private recursos!: Observable<Recurso[]>
    constructor(private db: AngularFirestore) {
        this.recursosCollection = this.db.collection<Recurso>('recursos');
    }

    public agregarRecurso(recurso: Recurso): Promise<any> {
        return this.recursosCollection.add(recurso);
    }

    public getRecursos(): Observable<Recurso[]> {
        this.recursos = this.recursosCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Recurso;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        );
        return this.recursos;
    }

    public getRecurso(id: string): Observable<Recurso> {
        return this.recursosCollection.doc<Recurso>(id).snapshotChanges().pipe(
            map(accion => {
                const data = accion.payload.data() as Recurso;
                data.id = accion.payload.id;
                return data;
            }));
    }

    public deleteRecurso(id: string | undefined): Promise<void> {
        return this.recursosCollection.doc(id).delete();
    }

    public actualizarRecurso(recurso: Recurso): Promise<void> {
        return this.recursosCollection.doc(recurso.id).update(recurso);
    }
}
