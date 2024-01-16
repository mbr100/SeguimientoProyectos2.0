import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { ExpertoTecnico } from "../models/expertoTecnico.model";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpertoComiteService {
    private expertoComiteCollection: AngularFirestoreCollection<ExpertoTecnico>;
    private expertosComite!: Observable<ExpertoTecnico[]>;
    private expertoComiteDoc!: AngularFirestoreDocument<ExpertoTecnico>;
    private expertoComite!: Observable<ExpertoTecnico>;
    constructor(private db: AngularFirestore) {
        this.expertoComiteCollection = db.collection<ExpertoTecnico>('expertosComite');
    }

    public agregarExpertoComite(expertoTecnico: ExpertoTecnico): Promise<any> {
        return this.expertoComiteCollection.add(expertoTecnico);
    }

    public getExpertosComite(): Observable<ExpertoTecnico[]>{
        this.expertosComite = this.expertoComiteCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as ExpertoTecnico;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        )
        return this.expertosComite;
    }

    public getExpertoComite(id: string): Observable<ExpertoTecnico>{
        this.expertoComiteDoc = this.db.doc<ExpertoTecnico>(`expertosComite/${id}`);
        this.expertoComite = this.expertoComiteDoc.snapshotChanges().pipe(
            map(accion => {
                const data = accion.payload.data() as ExpertoTecnico;
                data.id = accion.payload.id;
                return data;
            })
        )
        return this.expertoComite;
    }

    public actualizarExpertoComite(expertoTecnico: ExpertoTecnico): Promise<void>{
        return this.expertoComiteCollection.doc(expertoTecnico.id).update(expertoTecnico);
    }

    public eliminarExpertoComite(expertoTecnico: ExpertoTecnico): Promise<void>{
        return this.expertoComiteCollection.doc(expertoTecnico.id).delete();
    }
}
