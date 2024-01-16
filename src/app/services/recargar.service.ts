import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecargarService {
    public recargarEvento: EventEmitter<void> = new EventEmitter<void>();
}
