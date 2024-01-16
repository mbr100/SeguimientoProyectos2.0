import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import {provideClientHydration} from "@angular/platform-browser";
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCgipUzX0M9nAAqv4jifbgyUXXr4QarkZs",
      authDomain: "seguimientoproyectos2mbr.firebaseapp.com",
      projectId: "seguimientoproyectos2mbr",
      storageBucket: "seguimientoproyectos2mbr.appspot.com",
      messagingSenderId: "366007956782",
      appId: "1:366007956782:web:04bc48099442e44043f6bf"
    }), 'seguimientoproyectos2mbr')),
    importProvidersFrom(AngularFireModule.initializeApp({
      apiKey: "AIzaSyCgipUzX0M9nAAqv4jifbgyUXXr4QarkZs",
      authDomain: "seguimientoproyectos2mbr.firebaseapp.com",
      projectId: "seguimientoproyectos2mbr",
      storageBucket: "seguimientoproyectos2mbr.appspot.com",
      messagingSenderId: "366007956782",
      appId: "1:366007956782:web:04bc48099442e44043f6bf"
    })),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCgipUzX0M9nAAqv4jifbgyUXXr4QarkZs",
      authDomain: "seguimientoproyectos2mbr.firebaseapp.com",
      projectId: "seguimientoproyectos2mbr",
      storageBucket: "seguimientoproyectos2mbr.appspot.com",
      messagingSenderId: "366007956782",
      appId: "1:366007956782:web:04bc48099442e44043f6bf"
    }), 'seguimientoproyectos2mbr')),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId": "seguimientoproyectos2mbr",
      "appId": "1:366007956782:web:04bc48099442e44043f6bf",
      "storageBucket": "seguimientoproyectos2mbr.appspot.com",
      "apiKey": "AIzaSyCgipUzX0M9nAAqv4jifbgyUXXr4QarkZs",
      "authDomain": "seguimientoproyectos2mbr.firebaseapp.com",
      "messagingSenderId": "366007956782"
    }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
