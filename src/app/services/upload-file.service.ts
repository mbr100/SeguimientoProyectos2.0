import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
    constructor(private storage: AngularFireStorage) {}

    public subirImagenUsuario(file: File, id: string): AngularFireUploadTask {
        return this.storage.upload(`/usuarios/${id}`, file);
    }
}
