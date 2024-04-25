import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).then((ref) => {
    console.log('Application started!');
    console.log(ref);
}).catch((err) => {
    console.error('Error starting application!');
    console.error(err);
});
