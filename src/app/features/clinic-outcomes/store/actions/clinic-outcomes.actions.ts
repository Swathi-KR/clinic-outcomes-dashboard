import { createActionGroup, props } from '@ngrx/store';
import { ClinicOutcomeData } from '../../models/clinic-outcomes.model';

export const ClinicOutcomesActions = createActionGroup({
  source: 'ClinicOutcomes',
  events: {
    'Load': props<{ range: number }>(),
    'Load Success': props<{ data: ClinicOutcomeData }>(),
    'Load Failure': props<{ error: unknown }>(),
  },
});

export const loadClinicOutcomes = ClinicOutcomesActions.load;
export const loadClinicOutcomesSuccess = ClinicOutcomesActions.loadSuccess;
export const loadClinicOutcomesFailure = ClinicOutcomesActions.loadFailure;
