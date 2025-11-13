import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { clinicOutcomesFeature } from './features/clinic-outcomes/store/reducers/clinic-outcomes.reducer';
import { ClinicOutcomesEffects } from './features/clinic-outcomes/store/effects/clinic-outcomes.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    //  Create root store
    provideStore(),

    //  Start root effects system (this is the missing piece!)
    provideEffects(),

    // Register feature state
    provideState(clinicOutcomesFeature),

    //  Register feature effects
    provideEffects(ClinicOutcomesEffects), provideAnimationsAsync(),
  ],
};