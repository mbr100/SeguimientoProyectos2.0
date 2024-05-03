import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Aviso} from "@models/aviso.model";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AvisoService {
    private avisoCollection: AngularFirestoreCollection<Aviso>;
    private avisos!: Observable<Aviso[]>;

    constructor(private db: AngularFirestore) {
        this.avisoCollection = this.db.collection<Aviso>('avisos');
    }

    public listarAvisos(): Observable<Aviso[]> {
        this.avisos = this.avisoCollection.snapshotChanges().pipe(
            map(accion => {
                return accion.map(datos => {
                    const data = datos.payload.doc.data() as Aviso;
                    data.idAviso = datos.payload.doc.id;
                    return data;
                });
            })
        );
        return this.avisos;
    }

    public eliminarAvisos(avisos: Aviso): Promise<any> {
        return this.avisoCollection.doc(avisos.idAviso).delete();
    }
}
