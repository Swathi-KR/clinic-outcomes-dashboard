import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClinicOutcomes from '../reducers/clinic-outcomes.reducer';

export const selectClinicOutcomesState = createFeatureSelector<fromClinicOutcomes.State>(
  fromClinicOutcomes.clinicOutcomesFeatureKey
);
