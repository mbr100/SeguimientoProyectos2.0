import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from "@angular/platform-browser";
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase), 'seguimientoproyectos2mbr')),
        importProvidersFrom(AngularFireModule.initializeApp(environment.firebase, 'seguimientoproyectos2mbr')),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideFirestore(() => getFirestore())),
    ],
};
