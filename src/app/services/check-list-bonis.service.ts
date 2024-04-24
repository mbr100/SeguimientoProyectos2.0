import { Injectable } from '@angular/core';
import {CheckListBonis} from "@models/checkListBonis.model";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CheckListBonisService {
    private checkListBonisCollection: AngularFirestoreCollection<CheckListBonis>;
    constructor(private db: AngularFirestore) {
        this.checkListBonisCollection = this.db.collection<CheckListBonis>('checkListBonis');
    }

    public agregarCheckListBonis(checkListBonis: CheckListBonis): Promise<any>{
        return this.checkListBonisCollection.add(checkListBonis);
    }

    public eliminarCheckListBonis(checkListBonis: CheckListBonis): Promise<any> {
        return this.checkListBonisCollection.doc(checkListBonis.id).delete();
    }

    public editarCheckListBonis(checkListBonis: CheckListBonis): Promise<any> {
        return this.checkListBonisCollection.doc(checkListBonis.id).update(checkListBonis);
    }
}
