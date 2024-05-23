/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
registerLocaleData(localeEs, 'es-ES');

bootstrapApplication(AppComponent, appConfig).then((ref) => {
    console.log('Application started!');
    console.log(ref);
}).catch((err) => {
    console.error('Error starting application!');
    console.error(err);
});
