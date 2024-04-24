import { Injectable } from '@angular/core';
import {ExpertoTecnico} from "@models/expertoTecnico.model";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpertoTecnicoService {
    private expertoTecnicoCollection: AngularFirestoreCollection<ExpertoTecnico>;
    private expertosTecnicos!: Observable<ExpertoTecnico[]>;
    private expertoTecnicoDoc!: AngularFirestoreDocument<ExpertoTecnico>;
    private expertoTecnico!: Observable<ExpertoTecnico>;
    constructor(private db: AngularFirestore) {
        this.expertoTecnicoCollection = this.db.collection<ExpertoTecnico>('expertosTecnicos');
    }

    public agregarExpertoTecnico(expertoTecnico: ExpertoTecnico): Promise<any> {
        return this.expertoTecnicoCollection.add(expertoTecnico);
    }

    public getExpertosTecnicos(): Observable<ExpertoTecnico[]>{
        this.expertosTecnicos = this.expertoTecnicoCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as ExpertoTecnico;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        )
        return this.expertosTecnicos;
    }

    public getExpertoTecnico(id: string): Observable<ExpertoTecnico>{
        this.expertoTecnicoDoc = this.db.doc<ExpertoTecnico>(`expertosTecnicos/${id}`);
        this.expertoTecnico = this.expertoTecnicoDoc.snapshotChanges().pipe(
            map(accion => {
                const data = accion.payload.data() as ExpertoTecnico;
                data.id = accion.payload.id;
                return data;
            })
        )
        return this.expertoTecnico;
    }

    public actualizarExpertoTecnico(expertoTecnico: ExpertoTecnico): Promise<void>{
        return this.expertoTecnicoCollection.doc(expertoTecnico.id).update(expertoTecnico);
    }

    public eliminarExpertoTecnico(expertoTecnico: ExpertoTecnico): Promise<void>{
        return this.expertoTecnicoCollection.doc(expertoTecnico.id).delete();
    }

}
