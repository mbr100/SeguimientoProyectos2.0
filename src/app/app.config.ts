import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AngularFireModule } from "@angular/fire/compat";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environment } from "@environments/environment";

import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore'
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(AngularFireModule.initializeApp(environment.firebase, environment.nombreApp)),
        provideFirestore(()=>getFirestore()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        //provideFirebaseApp(() => initializeApp(environment.firebase), environment.nombreApp),
        //{ provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['http://localhost', 8080] : undefined },
        //{ provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost', 9099] : undefined },
    ]
};
