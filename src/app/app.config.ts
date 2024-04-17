import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire/compat";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore'
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase), environment.nombreApp)),
        importProvidersFrom(AngularFireModule.initializeApp(environment.firebase, environment.nombreApp)),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        //{ provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['http://localhost', 8080] : undefined },
        //{ provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost', 9099] : undefined },
    ]
};
