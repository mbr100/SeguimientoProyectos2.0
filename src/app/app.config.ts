import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AngularFireModule } from "@angular/fire/compat";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environment } from "@environments/environment";
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es-ES');

import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore'
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(AngularFireModule.initializeApp(environment.firebase, environment.nombreApp)),
        provideFirestore(()=>getFirestore()),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        { provide: LOCALE_ID, useValue: 'es-ES' },
        provideFirebaseApp(() => initializeApp(environment.firebase), environment.nombreApp),
        { provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['http://localhost', 8080] : undefined },
        //{ provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost', 9099] : undefined },
    ]
};
