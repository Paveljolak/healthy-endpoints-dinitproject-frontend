import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routeConfig } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
  ],
};
