import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

import { routeConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { customInterceptor } from './services/interceptor/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    { provide: HTTP_INTERCEPTORS, useValue: customInterceptor, multi: true },
  ],
};
