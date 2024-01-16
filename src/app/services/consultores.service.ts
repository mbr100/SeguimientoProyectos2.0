import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {Consultores} from "../models/consultores.model";
import {map, Observable} from "rxjs";
import {ExpertoTecnico} from "../models/expertoTecnico.model";
import {Action} from "rxjs/internal/scheduler/Action";

@Injectable({
    providedIn: 'root'
})
export class ConsultoresService {
    private consultoresCollection: AngularFirestoreCollection<Consultores>;
    private consutores!: Observable<Consultores[]>;
    private consultorDoc!: AngularFirestoreDocument<Consultores>;

    constructor(private db: AngularFirestore) {
        this.consultoresCollection = db.collection<Consultores>('consultores');
    }

    public getConsultores(): Observable<Consultores[]> {
        this.consutores = this.consultoresCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Consultores;
                    data.id = datos.payload.doc.id;
                    return data;
                });
            })
        );
        return this.consutores;
    }

    public agregarConsultor(consultor: Consultores): Promise<any>{
        return this.consultoresCollection.add(consultor);
    }

    public eliminarConsultor(consultor: Consultores): Promise<any> {
        return this.consultoresCollection.doc(consultor.id).delete();
    }

    public actualizarConsultor(consultor: Consultores): Promise<any> {
        return this.consultoresCollection.doc(consultor.id).update(consultor);
    }

    public getConsultor(idConsultor: string): Observable<Consultores> {
        this.consultorDoc = this.consultoresCollection.doc<Consultores>(idConsultor);
        return this.consultorDoc.snapshotChanges().pipe(
            map((accion) => {
                const data = accion.payload.data() as Consultores;
                data.id = accion.payload.id;
                return data;
            })
        );
    }
}
